// Common Date operations
const now = new Date();
const specificDate = new Date('2023-12-25T10:30:00');

// Format date
const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

// Simple timer
const startTimer = (durationInSeconds) => {
    const end = new Date().getTime() + (durationInSeconds * 1000);
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = end - now;
        
        if (distance < 0) {
            clearInterval(timer);
            console.log('Timer finished!');
            return;
        }
        
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        console.log(`${minutes}m ${seconds}s`);
    }, 1000);
};

// Stopwatch
class Stopwatch {
    constructor() {
        this.startTime = 0;
        this.running = false;
        this.elapsedTime = 0;
    }

    start() {
        if (!this.running) {
            this.startTime = new Date().getTime();
            this.running = true;
        }
    }

    stop() {
        if (this.running) {
            this.elapsedTime = new Date().getTime() - this.startTime;
            this.running = false;
        }
        return this.elapsedTime / 1000;
    }

    reset() {
        this.elapsedTime = 0;
        this.running = false;
    }
}

// Exam timer example
const createExamTimer = (durationMinutes) => {
    const endTime = new Date().getTime() + (durationMinutes * 60 * 1000);
    
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const timeLeft = endTime - now;
        
        if (timeLeft < 0) {
            clearInterval(timer);
            console.log('Exam time is up!');
            return;
        }
        
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        console.log(`Time remaining: ${hours}h ${minutes}m`);
    }, 60000); // Updates every minute
};

// Usage examples
console.log(formatDate(now));
startTimer(10); // 10 second timer
const watch = new Stopwatch();
createExamTimer(180); // 3 hour exam timer