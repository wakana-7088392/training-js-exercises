// もとのコード①
function fizzbuzz(n: number) {
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) {
      console.log("FizzBuzz");
    } else if (i % 3 === 0) {
      console.log("Fizz");
    } else if (i % 5 === 0) {
      console.log("Buzz");
    } else {
      console.log(i);
    }
  }
}

function reFizzbuzz(n: number) {
  let num = [...new Array(n)];
  num = num.map((v, i) => {
    return { number: i + 1, result: i + 1 };
  });
  let num15 = num
    .filter((x) => x.result % 15 === 0)
    .map((v) => {
      return { number: v.number, result: "FizzBuzz" };
    });
  let num3 = num
    .filter((x) => x.result % 15 !== 0 && x.result % 3 === 0)
    .map((v) => {
      return { number: v.number, result: "Fizz" };
    });
  let num5 = num
    .filter((x) => x.result % 15 !== 0 && x.result % 5 === 0)
    .map((v) => {
      return { number: v.number, result: "Buzz" };
    });
  let numOther = num.filter((x) => x.result % 3 !== 0 && x.result % 5 !== 0);
  let array = new Array();
  array = array
    .concat(num15, num3, num5, numOther)
    .sort((a, b) => a.number - b.number);
  array.forEach(function (v) {
    console.log(v.result);
  });
}

reFizzbuzz(20);

// もとのコード②
function sumOfSquaredDifference(f: number[], g: number[]) {
  let result = 0;
  for (let i = 0; i < f.length; i++) {
    result += (f[i] - g[i]) ** 2;
  }
  return result;
}

function reSumOfSquaredDifference(f: number[], g: number[]) {
  let result = 0;
  f.forEach(function (v, i) {
    result += (v - g[i]) ** 2;
  });
  return result;
}
const f = [20, 50, 40, 30, 10, 80];
const g = [10, 20, 30, 40, 50, 60];
console.log(`sumOfSquaredDifference = ${reSumOfSquaredDifference(f, g)}`);
console.log(`reSumOfSquaredDifference = ${reSumOfSquaredDifference(f, g)}`);

// もとのコード③
function sumOfEvensIsLargerThan42(array: number[]) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] % 2 !== 0) {
      continue;
    }
    sum += array[i];
    if (sum >= 42) {
      return true;
    }
  }
  return false;
}

function reSumOfEvensIsLargerThan42(array: number[]) {
  let result = array.filter((x) => x % 2 === 0).reduce((x, y) => x + y) >= 42;
  return result;
}

const array = [20, 21, 22, 23, 24];
console.log(`sumOfEvensIsLargerThan42 = ${sumOfEvensIsLargerThan42(array)}`);
console.log(
  `reSumOfEvensIsLargerThan42 = ${reSumOfEvensIsLargerThan42(array)}`
);
