import { fibonacci } from "./index.ts";

describe("ch12/ex02", () => {
  test("fibonacci 0", () => {
    expect(fibonacci(0)).toBe(0);
  });
  test("fibonacci 1", () => {
    expect(fibonacci(1)).toBe(1);
  });
  test("fibonacci 2", () => {
    expect(fibonacci(2)).toBe(1);
  });
  test("fibonacci 3", () => {
    expect(fibonacci(3)).toBe(2);
  });
  test("fibonacci 10", () => {
    expect(fibonacci(10)).toBe(55);
  });
});
