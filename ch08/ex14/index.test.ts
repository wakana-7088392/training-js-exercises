import { any, catching } from "./index.ts";

describe("ch08/ex14", () => {
  test("any", () => {
    const isNonZero = any(
      (n) => n > 0,
      (n) => n < 0
    );
    expect(isNonZero(0)).toBe(false);
    expect(isNonZero(42)).toBe(true);
    expect(isNonZero(-0.5)).toBe(true);
  });
  test("catching", () => {
    const safeJsonParse = catching(JSON.parse, (e: any) => {
      return { error: e.toString() };
    });
    expect(safeJsonParse('{"a": 1}')).toEqual({ a: 1 });
    expect(safeJsonParse("{Invalid Json}")).toEqual({
      error: "SyntaxError: Expected property name or '}' in JSON at position 1",
    });
  });
});
