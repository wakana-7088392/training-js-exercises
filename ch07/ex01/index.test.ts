import { add } from "./index.ts";
describe("ch07/ex01", () => {
  test("add", () => {
    const num1 = [
      [1, 2],
      [2, 4],
    ];
    const num2 = [
      [2, 3],
      [2, 3],
    ];
    expect(add(num1, num2)).toEqual([
      [3, 5],
      [4, 7],
    ]);
  });
});
