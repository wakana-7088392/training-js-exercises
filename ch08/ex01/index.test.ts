import { resArray2, res, obj } from "./index.ts";

describe("ch08/ex01", () => {
  test("resArray", () => {
    const exArray = ["abc123", "abc123", "abc123"];
    console.log = jest.fn();
    const r = resArray2(3, "abc123");
    expect(console.log).toHaveBeenCalledTimes(3);
    expect(r).toEqual(exArray);
  });
  test("res", () => {
    const r = res(2);
    expect(r).toBe(4);
  });
  test("obj", () => {
    const mockDate = new Date("2024-01-01T00:00:00.000Z");
    jest.useFakeTimers().setSystemTime(mockDate.getTime());
    const exObj = {};
    const r = obj();
    expect(r["now"].toISOString()).toEqual("2024-01-01T00:00:00.000Z");
  });
});
