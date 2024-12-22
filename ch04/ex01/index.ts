const a = { x: 2, y: 3 };
const b = { x: -1, y: 2 };

export type xy = { x: number; y: number };

export const add = (a: xy, b: xy) => {
  return { x: a.x + b.x, y: a.y + b.y };
};
export const sub = (a: xy, b: xy) => {
  return { x: a.x - b.x, y: a.y - b.y };
};
export const mul = (a: xy, b: xy) => {
  const rn = a.x * b.x + a.y * b.y * -1;
  const imgn = a.x * b.y + a.y * b.x;
  return { x: rn, y: imgn };
};
export const div = (a: xy, b: xy) => {
  const res1 = mul(a, { x: b.x, y: -b.y });
  const res2 = b.x * b.x - b.y * b.y * -1;
  return { x: res1.x / res2, y: res1.y / res2 };
};

console.log(add(a, b)); // 1 + 5i
console.log(sub(a, b)); // 3 + i
console.log(mul(a, b)); // -8 + i
console.log(div(a, b)); // 0.8 - 1.4i
