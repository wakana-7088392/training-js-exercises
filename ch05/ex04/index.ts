export const fib10While = () => {
  let fibArray1 = [1, 1];
  let i = 2;
  while (i <= 10) {
    fibArray1.push(
      fibArray1[fibArray1.length - 2] + fibArray1[fibArray1.length - 1]
    );
    i++;
  }
  return fibArray1;
};

console.log(fib10While());

export const fib10DoWhile = () => {
  let fibArray2 = [1, 1];
  let i = 2;
  do {
    fibArray2.push(
      fibArray2[fibArray2.length - 2] + fibArray2[fibArray2.length - 1]
    );
    i++;
  } while (i <= 10);
  return fibArray2;
};

console.log(fib10DoWhile());

export const fib10For = () => {
  let fibArray3 = [1, 1];
  for (let i = 2; i <= 10; i++) {
    fibArray3.push(
      fibArray3[fibArray3.length - 2] + fibArray3[fibArray3.length - 1]
    );
  }
  return fibArray3;
};

console.log(fib10For());
