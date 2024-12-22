import { deleteOdd } from "./index.ts";

describe("ex05", () => {
  test("normal", () => {
    let example = { a: 1, b: 2, c: 3 };
    deleteOdd(example);
    expect(example).toEqual({ b: 2 });
  });
});
