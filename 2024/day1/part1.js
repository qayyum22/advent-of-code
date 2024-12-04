const fs = require('fs');

// const inputData = fs.readFileSync("data.txt", 'utf-8');
// const arr = inputData.trim().split('\n');

// const arr1 = '60236   87497\r';
// const arr2 = arr1.replace(/\s+/, " ");
// let [left, right] = arr2.split(' ').map(Number);
// console.log(left, right);

// // console.log(arr);
function findDistance(arr) {
    const leftArr = [];
    const rightArr = []
    arr.forEach((line) => {
        const [left, right] = line.replace(/\s+/, " ").split(' ').map(Number);
        leftArr.push(left);
        rightArr.push(right);
    })

    leftArr.sort();
    rightArr.sort();

    let distance = 0;
    for (let i = 0; i < leftArr.length; i++) {
        distance += Math.abs(leftArr[i] - rightArr[i]);
    }
    return distance;
}


const inputData = fs.readFileSync("data.txt", 'utf-8');
const arr = inputData.trim().split('\n');

console.log(findDistance(arr));