import { checkHolidayIfElse, checkHolidaySwitch } from "./index.ts";
describe("ex03", () => {
  describe("if else", () => {
    test('"土"のためtrue', () => {
      expect(checkHolidayIfElse("土")).toBe(true);
    });
    test('"日"のためtrue', () => {
      expect(checkHolidayIfElse("日")).toBe(true);
    });
    test('"月"のためfalse', () => {
      expect(checkHolidayIfElse("月")).toBe(false);
    });
    test('"火"のためfalse', () => {
      expect(checkHolidayIfElse("火")).toBe(false);
    });
    test('"水"のためfalse', () => {
      expect(checkHolidayIfElse("水")).toBe(false);
    });
    test('"木"のためfalse', () => {
      expect(checkHolidayIfElse("木")).toBe(false);
    });
    test('"金"のためfalse', () => {
      expect(checkHolidayIfElse("金")).toBe(false);
    });
    test('"土日"で文字数が複数であるためエラー', () => {
      expect(() => checkHolidayIfElse("土日")).toThrow(
        "曜日を1文字だけ引数に渡してください"
      );
    });
    test('"雷"で曜日に当てはまらないためエラー', () => {
      expect(() => checkHolidaySwitch("雷")).toThrow(
        "曜日を1文字だけ引数に渡してください"
      );
    });
  });
  describe("switch", () => {
    test('"土"のためtrue', () => {
      expect(checkHolidaySwitch("土")).toBe(true);
    });
    test('"日"のためtrue', () => {
      expect(checkHolidaySwitch("日")).toBe(true);
    });
    test('"月"のためfalse', () => {
      expect(checkHolidaySwitch("月")).toBe(false);
    });
    test('"火"のためfalse', () => {
      expect(checkHolidaySwitch("火")).toBe(false);
    });
    test('"水"のためfalse', () => {
      expect(checkHolidaySwitch("水")).toBe(false);
    });
    test('"木"のためfalse', () => {
      expect(checkHolidaySwitch("木")).toBe(false);
    });
    test('"金"のためfalse', () => {
      expect(checkHolidaySwitch("金")).toBe(false);
    });
    test('"土日"で文字数が複数であるためエラー', () => {
      expect(() => checkHolidaySwitch("土日")).toThrow(
        "曜日を1文字だけ引数に渡してください"
      );
    });
    test('"雷"で曜日に当てはまらないためエラー', () => {
      expect(() => checkHolidaySwitch("雷")).toThrow(
        "曜日を1文字だけ引数に渡してください"
      );
    });
  });
});
