import { fib } from "./index.js";

describe("fib", () => {
  it("引数が0の時は、空のオブジェクトが返る", () => {
    expect(() => fib(0)).toThrow("err");
  });

  it("引数が1の時は、1が返る", () => {
    expect(fib(1)).toBe(1);
  });

  it("引数が2の時は、1が返る", () => {
    expect(fib(2)).toBe(1);
  });

  it("引数が75の時は、2111485077978050が返る", () => {
    expect(fib(75)).toBe(2111485077978050);
  });
});
