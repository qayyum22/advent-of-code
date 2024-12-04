
function similarityScore(input) {

    const leftArr = [];
    const rightArr = [];

    input.forEach(line => {
        const [left, right] = line.split(/\s+/).map(Number);
        leftArr.push(left);
        rightArr.push(right);
    });

    leftArr.sort();
    rightArr.sort();

    const rightCount = {};

    for (let i = 0; i < rightArr.length; i++) {
        rightCount[rightArr[i]] = (rightCount[rightArr[i]] || 0) + 1;
    };

    let ss = 0;
    leftArr.forEach(num => {
        if (rightCount[num]) {
            ss += num * rightCount[num];
        }
    });

    return ss;

}

const fs = require('fs');
const input = fs.readFileSync('data.txt', 'utf-8');
const inputData = input.trim().split('\n');
console.log(similarityScore(inputData));
