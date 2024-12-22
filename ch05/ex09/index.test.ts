import { sParseJson } from "./index.ts";

describe("ex09", () => {
  test("success: true", () => {
    expect(sParseJson('{ "key": 0, "value": "OK" }')).toEqual({
      success: true,
      data: { key: 0, value: "OK" },
    });
  });
  test("success: false", () => {
    const res = sParseJson('{ key: 0, "value": "OK" }');
    expect(res.success).toEqual(false);
  });
});
