export const equal = (x, y) => {
  const f = 10 ** 10;
  const n1 = Math.round(x * f);
  const n2 = Math.round(y * f);
  return n1 === n2;
};
