import { A, B, C } from "./index.ts";

describe("ch09/ex03", () => {
  test("C", () => {
    const c = new C();
    expect(c.num).toBe(1);
    // expect(c.x) ← プロパティ 'x' はプライベートで、クラス 'C' 内でのみアクセスできます。
    expect(c.getX()).toBe(42);
  });
  test("A", () => {
    const a = new A();
    // expect(a.x) ← プロパティ 'x' は型 'A' に存在しません。
    expect(a.getX()()).toBe(42);
  });
  test("B", () => {
    const b = new B();
    // expect(b.x) ← プロパティ 'x' は型 'B' に存在しません。
    expect(b.getX()).toBe(42);
  });
});
