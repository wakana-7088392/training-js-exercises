import { sort } from "./index.ts";
describe("ch07/ex07", () => {
  test("0 length", () => {
    const array = [];
    expect(sort(array)).toEqual([]);
  });
  test("1 length", () => {
    const array = [1];
    expect(sort(array)).toEqual([1]);
  });
  test("8 length", () => {
    const array = [8, 5, 1, 4, 7, 3, 6, 2];
    expect(sort(array)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });
});
