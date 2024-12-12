function blink(arr) {
  let i = 0;
  while (i < arr.length) {
    const stone = arr[i];

    if (stone === "0") {
      arr[i] = "1";
      i++;
    } else if (stone.length % 2 === 0) {
      const mid = stone.length / 2;
      const left = stone.slice(0, mid).replace(/^0+/, "") || "0";
      const right = stone.slice(mid).replace(/^0+/, "") || "0";

      arr[i] = left;
      arr.splice(i + 1, 0, right);
      i += 2;
    } else {
      arr[i] = (BigInt(stone) * 2024n).toString();
      i++;
    }
  }

  return arr;
}

function memoryEfficientBlink(input, iterations) {
  let arr = input.split(" ");

  for (let iter = 0; iter < iterations; iter++) {
    // Garbage collection hint
    if (iter % 10 === 0) {
      global.gc && global.gc(); // Node.js garbage collection
    }

    arr = blink(arr);
    console.log(`${iter + 1} ${arr.length}`);
  }

  return arr.length;
}

// Example usage
const input = "2 54 992917 5270417 2514 28561 0 990";
console.log(memoryEfficientBlink(input, 75));
