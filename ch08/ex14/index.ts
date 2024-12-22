export const any = (
  ...f: ((...n: any[]) => boolean)[]
): ((...n: any[]) => boolean) => {
  return function (...n: any[]): boolean {
    return f.some((fun) => fun(...n));
  };
};

const isNonZero = any(
  (n) => n > 0,
  (n) => n < 0
);

console.log(isNonZero(0)); // => false
console.log(isNonZero(42)); // => true
console.log(isNonZero(-0.5)); // => true

export const catching = (f1: any, f2: any) => {
  return function (...p: any[]) {
    try {
      return f1(...p);
    } catch (e: any) {
      return f2(e);
    }
  };
};

const safeJsonParse = catching(JSON.parse, (e: any) => {
  return { error: e.toString() };
});

console.log(safeJsonParse('{"a": 1}')); // => {a: 1}
console.log(safeJsonParse("{Invalid Json}")); // => {error: "SyntaxError: ..."}
