const f = (functionBody) => {
  let max;
  for (let i = 10; i > 0; i--) {
    if (functionBody.indexOf(`$${i}`) !== -1) {
      max = i;
      break;
    }
  }
  const $arr = [...new Array(max)].map((v, index) => `$${index + 1}`);
  return new Function(...$arr, `return ${functionBody}`);
};

let arr = [2, 1, 4, 5, 3, 7, 9, 6, 8, 10];

console.log(f("$1 + $4 + $5 + $10")(...arr));
console.log(arr.reduce(f("$1 + $2"), 0));
console.log(arr.sort(f("$1 - $2")));
