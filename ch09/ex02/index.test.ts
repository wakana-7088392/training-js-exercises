import { C } from "./index.ts"; // ts でも可

test("ch09/ex2", () => {
  const c = new C();
  expect(c.x).toBe(0);
  expect(c.x).toBe(1);
  expect(c.x).toBe(2);
});
