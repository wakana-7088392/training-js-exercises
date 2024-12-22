import { addMyCall } from "./index.ts";

describe("addMyCall", () => {
  test("When given function has no arg, then it can call this", () => {
    const f = function (this: any) {
      return this.a;
    } as any;
    addMyCall(f);
    expect(f.myCall({ a: 1 })).toBe(1);
  });

  test("When given function has 1 arg, then it can call this", () => {
    const f = function (this: any, x: any) {
      return this.a + x;
    } as any;
    addMyCall(f);
    expect(f.myCall({ a: 1 }, 2)).toBe(3);
  });

  test("When given function has multiple args, then it can call this", () => {
    const f = function (this: any, x: any, y: any, z: any, u: any, v: any) {
      return this.a + x + y + z + u + v;
    } as any;
    addMyCall(f);
    expect(f.myCall({ a: 1 }, 2, 3, 4, 5, 6)).toBe(21);
  });
});
