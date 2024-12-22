import { abs, sum, factorial } from "./index.js";

// TypeScript の場合は以下:
// import { abs, sum, factorial } from "./index.ts";

describe("math", () => {
  describe("abs", () => {
    it("returns same value when positive value given", () => {
      expect(abs(42)).toBe(42);
    });

    it("returns negated value when negative value given", () => {
      expect(abs(-42)).toBe(42);
    });

    it("returns zero value when zero given", () => {
      expect(abs(0)).toBe(0);
    });
  });

  // 以下に sum, factorial のテストを記載せよ
  describe("sum", () => {
    it("配列に値があれば、配列内の値の全てが加算される。", () => {
      expect(sum([2, 3, 5, 7, 11])).toBe(28);
    });
    it("配列に値があれば、配列内の値の全てが加算される。合計が負の値の場合も同様である。", () => {
      expect(sum([-2, -3, -5, -7, -11])).toBe(-28);
    });
    it("配列に値がなければ、0になる。", () => {
      expect(sum([])).toBe(0);
    });
  });

  describe("factorial", () => {
    it("正の値であれば、正の階乗が答えになる。", () => {
      expect(factorial(5)).toBe(120);
    });
    it("1の階乗は1", () => {
      expect(factorial(1)).toBe(1);
    });
    it("0の階乗は1", () => {
      expect(factorial(0)).toBe(1);
    });
  });
});
