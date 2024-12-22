import {
  getNumberOfDays,
  getPeriod,
  getLocaleDay,
  getLastMonthFirstDate,
} from "./index.ts";
import MockDate from "mockdate";

describe("ch11/ex10", () => {
  test("get number of days", () => {
    expect(getNumberOfDays(2024, 7)).toBe(31);
    expect(getNumberOfDays(2024, 2)).toBe(29);
    expect(getNumberOfDays(2023, 2)).toBe(28);
  });
  test("get period", () => {
    expect(getPeriod("2024-07-01", "2024-07-16")).toBe(12);
    expect(getPeriod("2024-06-27", "2024-07-16")).toBe(14);
  });
  test("get locale day", () => {
    expect(getLocaleDay("2024-07-16", "ja-JP")).toBe("火曜日");
    expect(getLocaleDay("2024-07-16", "en-US")).toBe("Tuesday");
  });
  test("get last month first date", () => {
    MockDate.set("2024-07-16T15:15:15");
    const year = getLastMonthFirstDate().getFullYear();
    const month = getLastMonthFirstDate().getMonth();
    const date = getLastMonthFirstDate().getDate();
    const time = getLastMonthFirstDate().toLocaleTimeString();
    expect(year).toBe(2024);
    expect(month).toBe(5);
    expect(date).toBe(1);
    expect(time).toBe("0:00:00");
  });
});
