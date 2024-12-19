let arr = [1, 2, 3, 4, 5];

// Adding elements to the array
arr.push(6, 7);
console.log('After push:', arr);

// Removing the last element
let lastElement = arr.pop();
console.log('Popped element:', lastElement);
console.log('After pop:', arr);

// Removing the first element
let firstElement = arr.shift();
console.log('Shifted element:', firstElement);
console.log('After shift:', arr);

// Adding elements to the beginning of the array
arr.unshift(0);
console.log('After unshift:', arr);

// Creating a new array by mapping
let doubled = arr.map(num => num * 2);
console.log('Doubled array:', doubled);

// Filtering the array
let filtered = arr.filter(num => num % 2 === 0);
console.log('Filtered array (even numbers):', filtered);

// Reducing the array to a sum
let sum = arr.reduce((acc, num) => acc + num, 0);
console.log('Sum of array:', sum);

// Finding an element
let found = arr.find(num => num > 3);
console.log('First element greater than 3:', found);

// Sorting the array in descending order
let sorted = arr.slice().sort((a, b) => b - a);
console.log('Sorted array (descending):', sorted);

// Checking if all elements are less than 10
let allLessThanTen = arr.every(num => num < 10);
console.log('All elements less than 10:', allLessThanTen);

// Checking if some elements are greater than 4
let someGreaterThanFour = arr.some(num => num > 4);
console.log('Some elements greater than 4:', someGreaterThanFour);

// Creating a new array by flattening a nested array
let nestedArr = [1, [2, 3], [4, [5, 6]]];
let flattened = nestedArr.flat(2);
console.log('Flattened array:', flattened);

// Creating a new array by flat mapping
let flatMapped = arr.flatMap(num => [num, num * 2]);
console.log('FlatMapped array:', flatMapped);

// Using Array.from to create an array from a string
let strArray = Array.from('hello');
console.log('Array from string:', strArray);

// Using Array.of to create an array from arguments
let ofArray = Array.of(1, 2, 3, 4);
console.log('Array.of:', ofArray);

// Using splice to remove and add elements
let spliced = arr.splice(2, 2, 10, 11);
console.log('Spliced elements:', spliced);
console.log('After splice:', arr);

// Using slice to create a subarray
let sliced = arr.slice(1, 4);
console.log('Sliced array:', sliced);

// Using join to create a string from the array
let joined = arr.join('-');
console.log('Joined array:', joined);

// Using toString to convert array to string
let str = arr.toString();
console.log('Array to string:', str);

// Using toLocaleString to convert array to locale string
let localeStr = arr.toLocaleString();
console.log('Array to locale string:', localeStr);

// Using keys to get array iterator
let keys = arr.keys();
console.log('Array keys:', Array.from(keys));

// Using values to get array iterator
let values = arr.values();
console.log('Array values:', Array.from(values));

// Using entries to get array iterator
let entries = arr.entries();
console.log('Array entries:', Array.from(entries));