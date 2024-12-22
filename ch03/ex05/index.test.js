import { x, y } from ".";

describe("CRLFReplace", () => {
  describe("LF->CR+LF", () => {
    test("xの引数に\\nがある時、\\r\\nに変換される。", () => {
      const moji = "あいうえお\nかきくけこ";
      expect(x(moji)).toBe("あいうえお\r\nかきくけこ");
    });
    test("xの引数に\\r\\nがある時、\\r\\nのままである。", () => {
      const moji = "あいうえお\r\nかきくけこ";
      expect(x(moji)).toBe("あいうえお\r\nかきくけこ");
    });
    test("xの引数に\\nがない時、何も変わらない。", () => {
      const moji = "あいうえお\rかきくけこ";
      expect(x(moji)).toBe("あいうえお\rかきくけこ");
    });
  });
  describe("CR+LF->LF", () => {
    test("yの引数に\\r\\nがある時、\\nに変換される。", () => {
      const moji = "あいうえお\r\nかきくけこ";
      expect(y(moji)).toBe("あいうえお\nかきくけこ");
    });
    test("yの引数に\\r\\nがない時、何も変わらない。", () => {
      const moji = "あいうえお\nかきくけこ";
      expect(y(moji)).toBe("あいうえお\nかきくけこ");
    });
  });
});
