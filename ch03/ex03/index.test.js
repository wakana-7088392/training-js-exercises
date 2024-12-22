import { equal } from ".";

describe("3.3test", () => {
  test("0.3-0.2はtrue", () => {
    expect(equal(0.3 - 0.2, 0.1)).toBe(true);
  });
  test("0.2-0.1はtrue", () => {
    expect(equal(0.2 - 0.1, 0.1)).toBe(true);
  });
  test("差とみなされる値が含まれる場合はfalse", () => {
    const unit = 10 ** -10;
    expect(equal(0.1 + unit, 0.1)).toBe(false);
    expect(equal(0.1 - unit, 0.1)).toBe(false);
  });
  test("差とみなされない値(誤差)を含まれる場合はtrue", () => {
    const gosa = 10 ** -11;
    expect(equal(0.1, 0.1)).toBe(true);
    expect(equal(0.1 + gosa, 0.1)).toBe(true);
    expect(equal(0.1 - gosa, 0.1)).toBe(true);
  });
});
