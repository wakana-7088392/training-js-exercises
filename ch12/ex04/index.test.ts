import { primes } from "./index.ts";

describe("ch12/ex02", () => {
  let p1 = primes();
  test("初回", () => {
    expect(p1.next().value).toBe(2);
  });
  test("2回目", () => {
    expect(p1.next().value).toBe(3);
  });
  test("3回目", () => {
    expect(p1.next().value).toBe(5);
  });
  test("100回目", () => {
    let p2 = primes();
    for (let i = 2; i <= 100; i++) {
      p2.next();
    }
    expect(p2.next().value).toBe(541);
  });
});
