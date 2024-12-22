import { checkTypeofTmpLiteral } from "./index.ts";

describe("ch14/ex05", () => {
  describe("tmpliteral one", () => {
    test("number", () => {
      expect(checkTypeofTmpLiteral`${12345}`).toBe("number");
    });
    test("string", () => {
      expect(checkTypeofTmpLiteral`${"A"}`).toBe("string");
    });
    test("object", () => {
      expect(checkTypeofTmpLiteral`${{ name: "taro" }}`).toBe("object");
    });
    test("boolean", () => {
      expect(checkTypeofTmpLiteral`${true}`).toBe("boolean");
    });
  });
  describe("tmpliteral multiple", () => {
    test("number, string, object, boolean", () => {
      expect(
        checkTypeofTmpLiteral`${12345}and${"A"}and${{ name: "taro" }}and${true}`
      ).toBe("number,string,object,boolean");
    });
  });
});
