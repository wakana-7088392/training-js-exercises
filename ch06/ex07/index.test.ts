import { assign } from "./index.ts";

describe("ch06/ex07", () => {
  //「コピー時は通常の読み出しと設定処理が行われる」については複数のテストを通して確認していると判断。
  describe("引数", () => {
    test("2つ", () => {
      // コピー先オブジェクト
      const targetO = { 1: "1" };
      // 継承プロパティがコピーされないことを確認する用のオブジェクト
      const proto = { p1: "proto1", p2: "proto2" };
      // コピー元の基本となるオブジェクト
      const o1 = Object.create(proto);
      o1["x"] = "x";
      o1["y"] = "y";
      assign(targetO, o1);
      expect(targetO).toEqual({ 1: "1", x: "x", y: "y" });
    });
    test("3つ", () => {
      // コピー先オブジェクト
      const targetO = { 1: "1" };
      // 継承プロパティがコピーされないことを確認する用のオブジェクト
      const proto = { p1: "proto1", p2: "proto2" };
      // コピー元の基本となるオブジェクト
      const o1 = Object.create(proto);
      o1["x"] = "x";
      o1["y"] = "y";
      const o = { a: "a", b: "b" };
      assign(targetO, o1, o);
      expect(targetO).toEqual({ 1: "1", x: "x", y: "y", a: "a", b: "b" });
    });
  });
  describe("列挙可な独自プロパティがコピーされる。プロパティがSymbolのものもコピーされる。", () => {
    test("列挙可な独自プロパティがコピーされる", () => {
      // コピー先オブジェクト
      const targetO = { 1: "1" };
      // 継承プロパティがコピーされないことを確認する用のオブジェクト
      const proto = { p1: "proto1", p2: "proto2" };
      // コピー元の基本となるオブジェクト
      const o1 = Object.create(proto);
      o1["x"] = "x";
      o1["y"] = "y";
      o1["w"] = "w";
      Object.defineProperty(o1, "z", {
        value: "o1:列挙不可",
        enumerable: false,
      });
      assign(targetO, o1);
      expect(targetO).toEqual({ 1: "1", x: "x", y: "y", w: "w" });
    });
    test("プロパティがSymbolのものもコピーされる", () => {
      // コピー先オブジェクト
      let targetO = { 1: "1" };
      // 継承プロパティがコピーされないことを確認する用のオブジェクト
      let proto = { p1: "proto1", p2: "proto2" };
      // コピー元の基本となるオブジェクト
      const o1 = Object.create(proto);
      o1["x"] = "x";
      o1["y"] = "y";
      let oSym = Symbol("oPropname");
      o1[oSym] = "oSym";
      assign(targetO, o1);
      const expectO = { 1: "1", x: "x", y: "y" };
      expectO[oSym] = "oSym";
      expect(targetO).toEqual(expectO);
    });
  });
  describe("コピー先は変更され、コピー元は変更されない", () => {
    // コピー先オブジェクト
    let targetO = { 1: "1" };
    // 継承プロパティがコピーされないことを確認する用のオブジェクト
    let proto = { p1: "proto1", p2: "proto2" };
    // コピー元の基本となるオブジェクト
    const o1 = Object.create(proto);
    o1["x"] = "x";
    o1["y"] = "y";
    assign(targetO, o1);
    expect(targetO).toEqual({ 1: "1", x: "x", y: "y" });
    expect(o1).toEqual({ x: "x", y: "y" });
  });
  describe("同じ名前でプロパティが定義された場合は上書きされ、後の引数のものが最終的に残る", () => {
    // コピー先オブジェクト
    let targetO = { 1: "1" };
    // 継承プロパティがコピーされないことを確認する用のオブジェクト
    let proto = { p1: "proto1", p2: "proto2" };
    // コピー元の基本となるオブジェクト
    const o1 = Object.create(proto);
    o1["x"] = "x";
    o1["y"] = "y";
    const o3 = { x: "a", y: "b" };
    assign(targetO, o1, o3);
    expect(targetO).toEqual({ 1: "1", x: "a", y: "b" });
  });
  describe("ゲッタ―メソッドとセッターメソッドを持つ場合はコピー時に呼び出される", () => {
    test("コピー元にゲッタ―がある時、コピー時に呼び出される", () => {
      // コピー先オブジェクト
      let targetO = { 1: "1" };
      const o = {
        num1: 1,
        num2: 2,
        get sum() {
          return this.num1 + this.num2;
        },
      };
      assign(targetO, o);
      expect(targetO).toEqual({ "1": "1", num1: 1, num2: 2, sum: 3 });
    });
    test("コピー先にセッターがある時、コピー時に呼び出される", () => {
      // 継承プロパティがコピーされないことを確認する用のオブジェクト
      let proto = { p1: "proto1", p2: "proto2" };
      // コピー元の基本となるオブジェクト
      const o1 = Object.create(proto);
      o1["x"] = "x";
      o1["y"] = "y";
      o1["setNum1"] = 2;
      o1["setNum2"] = 3;
      const target = {
        tNum1: 1,
        tNum2: 2,
        get sum() {
          return this.tNum1 + this.tNum2;
        },
        set setNum1(newValue) {
          this.tNum1 = newValue;
        },
        set setNum2(newValue) {
          this.tNum2 = newValue;
        },
      };
      assign(target, o1);
      expect(target).toEqual({
        setNum1: undefined,
        setNum2: undefined,
        sum: 5,
        tNum1: 2,
        tNum2: 3,
        x: "x",
        y: "y",
      });
    });
  });
});

/**
 * 等価な関数
 * 6.7に記載されたObject.assign()の仕様
 * ・引数は2つ以上
 * 　・1つ目がコピー先で、2つ目以降がコピー元
 * ・コピー元のオブジェクト毎に列挙可な独自プロパティをコピー先にコピーする
 * ・コピー先は変更され、コピー元は変更されない
 * ・プロパティ名がSymbolのものもコピーされる
 * ・引数としてあてられた順番にコピーされる
 * 　・この性質から、同じ名前でプロパティが定義された場合は上書きされ、後の引数の者が最終的に残る
 * ・コピー時は通常の読み出しと設定処理が行われる
 * 　・コピー元オブジェクトがゲッターメソッドを持っていたり、コピー先オブジェクトがセッターメソッドを持っている
 * 　　場合は、コピー時にそれらのメソッドが呼び出される
 * 　・メソッド自身はコピーされない
 */
