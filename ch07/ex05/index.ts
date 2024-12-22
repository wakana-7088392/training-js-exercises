const seq = [1, 2, 3, 4, 5];

export const pop = (seq: any[]) => {
  let resultArray = seq.filter((v, i, a) => i !== a.length - 1);
  return resultArray;
};

export const push = (seq: any[], value: any) => {
  let resultArray = [...seq, value];
  return resultArray;
};

export const shift = (seq: any[]) => {
  let resultArray = seq.slice(1, seq.length);
  return resultArray;
};

export const unshift = (seq: any[], value: any) => {
  let resultArray = [value, ...seq];
  return resultArray;
};

export const sort = (seq: any[], a: any) => {
  let copy = [...seq];
  let resultArray = copy.sort(a);
  return resultArray;
};

console.log(pop(seq)); // [1, 2, 3, 4]
console.log(push(seq, 6)); // [1, 2, 3, 4, 5, 6]
console.log(shift(seq)); // [2, 3, 4, 5]
console.log(unshift(seq, 0)); // [0, 1, 2, 3, 4, 5]
console.log(sort(seq, (a, b) => b - a)); // [5, 4, 3, 2, 1]

// 元の配列は変更されていない
console.log(seq); // [1, 2, 3, 4, 5]
