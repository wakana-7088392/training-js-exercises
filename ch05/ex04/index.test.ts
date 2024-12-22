import { fib10While, fib10DoWhile, fib10For } from "./index.ts";

describe("ex04", () => {
  let expectArray = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
  test("while", () => {
    console.log(fib10While());
    expect(fib10While()).toEqual(expectArray);
  });
  test("do while", () => {
    console.log(fib10DoWhile());
    expect(fib10DoWhile()).toEqual(expectArray);
  });
  test("for", () => {
    console.log(fib10For());
    expect(fib10For()).toEqual(expectArray);
  });
});
