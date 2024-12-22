import { sequexceToObject } from "./index.ts";
describe("ch08/ex05", () => {
  test("正常な引数(複数の文字)", () => {
    expect(sequexceToObject("a", "1", "b", "2")).toEqual({ a: "1", b: "2" });
  });
  test("正常な引数(配列)", () => {
    let arr = ["a", "1", "b", "2"];
    expect(sequexceToObject(...arr)).toEqual({ a: "1", b: "2" });
  });
  test("奇数番の値がstringではない場合", () => {
    expect(() => sequexceToObject(1, 2, 3, 4)).toThrow(Error);
  });
  test("値の個数の合計が偶数でない場合", () => {
    expect(() => sequexceToObject("a", "1", "b")).toThrow(Error);
  });
});
