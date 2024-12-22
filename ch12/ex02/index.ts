// function* fibonacciSequece() {
//   let x = 0;
//   let y = 1;

//   for (;;) {
//     yield y;
//     [x, y] = [y, x + y];
//   }
// }

function fibonacciSequece() {
  let x = 0;
  let y = 1;

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      let num = x;
      [x, y] = [y, x + y];
      return { value: num, done: false };
    },
  };
}

export function fibonacci(n: number) {
  for (let f of fibonacciSequece()) {
    console.log(f);
    if (n-- <= 0) {
      return f;
    }
  }
}

console.log(fibonacci(8));
