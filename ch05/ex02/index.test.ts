import { replaceIfElse, replaceSwitch } from "./index.ts";

describe("test ex02", () => {
  describe("test IfElse", () => {
    test("test all 1", () => {
      const s = '1\0a2\b3\t4\n5\v6\f7\r8"\\';
      expect(replaceIfElse(s)).toBe('1\\0a2\\b3\\t4\\n5\\v6\\f7\\r8\\"\\\\');
    });
  });

  describe("test Switch", () => {
    test("test all 1", () => {
      const s = '1\0a2\b3\t4\n5\v6\f7\r8"\\';
      expect(replaceSwitch(s)).toBe('1\\0a2\\b3\\t4\\n5\\v6\\f7\\r8\\"\\\\');
    });
  });
});
