import torch
import torch.nn as nn
from transformers import GPT2LMHeadModel, GPT2Config

class LatentModel(nn.Module):
    def __init__(self, config: GPT2Config):
        super().__init__()
        self.base_model = GPT2LMHeadModel(config)
        self.bot_token_id = None  # <bot> token id
        self.eot_token_id = None  # <eot> token id
        
    def add_special_tokens(self, tokenizer):
        """Add special tokens for latent reasoning"""
        special_tokens = {'additional_special_tokens': ['<bot>', '<eot>']}
        tokenizer.add_special_tokens(special_tokens)
        self.bot_token_id = tokenizer.convert_tokens_to_ids('<bot>')
        self.eot_token_id = tokenizer.convert_tokens_to_ids('<eot>')
        
        # Resize token embeddings to account for new special tokens
        self.base_model.resize_token_embeddings(len(tokenizer))

    def forward(self, input_ids, attention_mask=None, labels=None):
        """
        Forward pass handling both language and latent modes
        """
        batch_size, seq_length = input_ids.shape
        device = input_ids.device
        
        # Initialize hidden states storage
        hidden_states = []
        current_loss = 0
        
        # Process sequence token by token
        for pos in range(seq_length):
            # Get current token
            curr_token = input_ids[:, pos]
            
            if pos > 0:
                # Check if in latent mode (between <bot> and <eot>)
                in_latent = (input_ids[:, pos-1] == self.bot_token_id)
                
                if torch.any(in_latent):
                    # Use previous hidden state as embedding for latent tokens
                    prev_hidden = hidden_states[-1][in_latent]
                    self.base_model.transformer.wte.weight.data[curr_token[in_latent]] = prev_hidden
            
            # Forward pass through transformer
            outputs = self.base_model(
                input_ids=input_ids[:, :pos+1],
                attention_mask=attention_mask[:, :pos+1] if attention_mask is not None else None
            )
            
            # Store hidden states
            hidden_states.append(outputs.last_hidden_state[:, -1])
            
            # Calculate loss if labels provided
            if labels is not None and pos < seq_length - 1:
                next_token = labels[:, pos+1]
                logits = outputs.logits[:, -1, :]
                loss = nn.CrossEntropyLoss()(logits, next_token)
                current_loss += loss

        return {
            'loss': current_loss if labels is not None else None,
            'hidden_states': hidden_states,
            'last_hidden_state': hidden_states[-1]
        }

    def generate(self, input_ids, max_length, num_latent_thoughts=2):
        """
        Generate text with latent reasoning
        """
        current_ids = input_ids
        
        # Add <bot> token after input
        bot_tokens = torch.tensor([[self.bot_token_id]] * input_ids.shape[0], device=input_ids.device)
        current_ids = torch.cat([current_ids, bot_tokens], dim=1)
        
        # Generate latent thoughts
        for _ in range(num_latent_thoughts):
            outputs = self.forward(current_ids)
            hidden_state = outputs['last_hidden_state']
            # Use hidden state as next embedding
            self.base_model.transformer.wte.weight.data[-1] = hidden_state
            current_ids = torch.cat([current_ids, torch.tensor([[self.eot_token_id]], device=input_ids.device)], dim=1)
            
        # Generate final answer
        outputs = self.base_model.generate(
            current_ids,
            max_length=max_length,
            pad_token_id=self.base_model.config.pad_token_id,
            eos_token_id=self.base_model.config.eos_token_id
        )
        
        return outputs

    def train_step(self, batch, optimizer, stage):
        """
        Training step with curriculum learning
        """
        optimizer.zero_grad()
        outputs = self.forward(**batch)
        loss = outputs['loss']
        loss.backward()
        optimizer.step()
        return loss.item()

# Initialize
config = GPT2Config()
model = LatentModel(config)

# Add special tokens
model.add_special_tokens(tokenizer)

# Training
optimizer = torch.optim.Adam(model.parameters())
for stage in range(num_stages):
    for batch in dataloader:
        loss = model.train_step(batch, optimizer, stage)

# Generation
output = model.generate(input_ids, max_length=100, num_latent_thoughts=2)
