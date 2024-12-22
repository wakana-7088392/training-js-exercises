import { bitCount } from "./index.ts";

describe("bitCount Test", () => {
  test("0b111", () => {
    expect(bitCount(0b111)).toBe(3);
  });
  test("0b1111111111111111111111111111111", () => {
    expect(bitCount(0b1111111111111111111111111111111)).toBe(31);
  });
  test("-1", () => {
    expect(bitCount(-1)).toBe(32);
  });
});
