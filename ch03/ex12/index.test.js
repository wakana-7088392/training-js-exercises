import { equals } from ".";

describe("equals test", () => {
  test("test success", () => {
    let obj1 = { x: 1, y: 1 };
    let obj2 = { x: 1, y: 1 };
    expect(equals(obj1, obj2)).toBe(true);
  });
  test("test fail value", () => {
    let obj1 = { x: 1, y: 2 };
    let obj2 = { x: 1, y: 1 };
    expect(equals(obj1, obj2)).toBe(false);
  });
  test("test fail key", () => {
    let obj1 = { x: 1, y: 1 };
    let obj2 = { x: 1, a: 1 };
    expect(equals(obj1, obj2)).toBe(false);
  });
});
