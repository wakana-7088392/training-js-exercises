export const sum = (array?: number[]) => {
  return array?.reduce((x, y) => x + y, 0) ?? 0;
};

export const join = (array?: any[], str: string | null = ",") => {
  if (array === undefined) throw {};
  if (array.length === 0) return "";
  return array.reduce((x, y) => String(x) + str + String(y ?? ""));
};

export const reverse = (array?: any[]) => {
  if (array === undefined) throw {};
  return array.reduce((x, y) => [y, ...x], []);
};

export const every = (
  array: any[],
  func: (x: any, i: number, a: any[]) => boolean
) => {
  return array.reduce((x, y, i, a) => x && func(y, i, a), true);
};

export const some = (
  array: any[],
  func: (x: any, i: number, a: any[]) => boolean
) => {
  return array.reduce((x, y, i, a) => x || func(y, i, a), false);
};

const array = [1, 42, 43, 44, 45];
const isBelowThreshold = (currentValue: any) => Number(currentValue) < 40;
console.log(`sum = ${sum(array)}`);
console.log(`join = ${join(array)}`);
console.log(`reverse = ${reverse(array)}`);
console.log(`every = ${every(array, isBelowThreshold)}`);
console.log(`some = ${some(array, isBelowThreshold)}`);
