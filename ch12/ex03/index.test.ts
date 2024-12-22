import { counter } from "./index.ts";

describe("ch12/ex03", () => {
  const c = counter();
  test("counterを呼び出すたびに1加算された値を返す", () => {
    expect(c.next().value).toBe(0);
    expect(c.next().value).toBe(1);
    expect(c.next().value).toBe(2);
    expect(c.next().value).toBe(3);
  });
  test("counterでエラーをスローした際、初期化されて0を返し、最初から加算しなおす", () => {
    expect(c.next().value).toBe(4);
    expect(c.throw(new Error("error")).value).toBe(0);
    expect(c.next().value).toBe(1);
    expect(c.next().value).toBe(2);
    expect(c.next().value).toBe(3);
  });
});
