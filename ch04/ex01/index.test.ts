import { add, sub, mul, div } from "./index.ts";

describe("Four arithmetic opetations", () => {
  const a = { x: 2, y: 3 };
  const b = { x: -1, y: 2 };
  test("add", () => {
    expect(add(a, b)).toEqual({ x: 1, y: 5 });
  });
  test("sub", () => {
    expect(sub(a, b)).toEqual({ x: 3, y: 1 });
  });
  test("mul", () => {
    expect(mul(a, b)).toEqual({ x: -8, y: 1 });
  });
  test("div", () => {
    expect(div(a, b)).toEqual({ x: 0.8, y: -1.4 });
  });
});
