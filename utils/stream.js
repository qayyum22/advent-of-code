// function type(text){

//     let index = 0;

//     function emitCharacters(){
//         if(index < text.length){
//             process.stdout.write(text.charAt(index++));
//             setTimeout(emitCharacters, 0);
//         }else{
//             console.log();
//         }
//     }
//     emitCharacters();
// }

const fs = require('fs');
const input = fs.readFileSync('data.txt', 'utf8');
// type(input);

process.stdout.write(input);