import { loopCal, recursionCal } from "./index.ts";

describe("ch08/ex02", () => {
  describe("loopCal", () => {
    test("n is 0", () => {
      const r = loopCal(2, 0);
      expect(r).toBe(1);
    });
    test("n is 1", () => {
      const r = loopCal(2, 1);
      expect(r).toBe(2);
    });
    test("x is positive", () => {
      const r = loopCal(2, 3);
      expect(r).toBe(8);
    });
    test("x is negative", () => {
      const r = loopCal(-2, 3);
      expect(r).toBe(-8);
    });
  });
  describe("reculsionCal", () => {
    test("n is 0", () => {
      const r = recursionCal(2, 0);
      expect(r).toBe(1);
    });
    test("n is 1", () => {
      const r = recursionCal(2, 1);
      expect(r).toBe(2);
    });
    test("x is positive", () => {
      const r = recursionCal(2, 3);
      expect(r).toBe(8);
    });
    test("x is negative", () => {
      const r = recursionCal(-2, 3);
      expect(r).toBe(-8);
    });
  });
});
