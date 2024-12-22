import { Foo, TypeMap } from "./index.ts";

describe("ch11/ex02", () => {
  const typeMap = new TypeMap();
  test("正常系", () => {
    typeMap.set(String, "string");
    typeMap.set(Number, 123);
    const foo = new Foo();
    typeMap.set(Foo, foo);
    expect(typeMap.get(String)).toBe("string");
    expect(typeMap.get(Number)).toBe(123);
    expect(typeMap.get(Foo)).toBe(foo);
  });
  test("異常系", () => {
    expect(() => typeMap.set(Date, "not a date")).toThrow("value error");
  });
});
