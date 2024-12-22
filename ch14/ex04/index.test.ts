import { has } from "lodash";
import { HiraganaUtf16, sortHiragana } from "./index.ts";

describe("ch14/ex04", () => {
  const h = new HiraganaUtf16("あ");
  describe("check HiraganaUtf16", () => {
    test("create", () => {
      expect(h.hiragana).toBe("あ");
      expect(h.utf16).toBe(12354);
    });
    test("create error", () => {
      expect(() => new HiraganaUtf16("A")).toThrow("平仮名一文字のみ有効");
      expect(() => new HiraganaUtf16("ア")).toThrow("平仮名一文字のみ有効");
      expect(() => new HiraganaUtf16("あい")).toThrow("平仮名一文字のみ有効");
    });
  });
  describe("check Symbol.toPrimitive", () => {
    test("check type", () => {
      expect(+h).toBe(12354);
      expect(`${h}`).toBe("あ");
      expect(h + "").toBe("あ");
    });
  });
  describe("check sort", () => {
    test("sort", () => {
      const hArr = [
        new HiraganaUtf16("あ"),
        new HiraganaUtf16("う"),
        new HiraganaUtf16("お"),
        new HiraganaUtf16("い"),
        new HiraganaUtf16("え"),
      ];
      expect(sortHiragana(hArr).map((h) => h.hiragana)).toEqual([
        "あ",
        "い",
        "う",
        "え",
        "お",
      ]);
    });
  });
});
