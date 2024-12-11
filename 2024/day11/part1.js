const input = `2 54 992917 5270417 2514 28561 0 990`;
const arr = input.split(" ");
// console.log(arr);

// const str = '992917';
// if(str.length % 2 ==0){
//     const left = str.slice(0, str.length / 2);
//     const right = str.slice(str.length / 2);
//     console.log(left, right);
// }

const arr2 = arr.forEach((item) => {
  if (item == 0) {
    item = "1";
  } else if (item.length % 2 == 0) {
    const left = item.slice(0, item.length / 2);
    const right = item.slice(item.length / 2);
    item = [left, right];
  } else {
    item = parseInt(item) * 2024;
    item = item.toString();
  }
});
console.log(arr2);
