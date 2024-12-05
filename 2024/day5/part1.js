const fs = require('fs'); 
const input = fs.readFileSync('data.txt', 'utf-8').split('\n');
console.log(input[0].split('|'));