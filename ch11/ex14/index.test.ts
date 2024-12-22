import { sortJapanese, toJapaneseDateString } from "./index.ts";

describe("ch11/ex14", () => {
  test("sort Japanese", () => {
    const arr1 = ["え", "い", "お", "う", "あ"];
    const arr2 = ["え", "ぃ", "お", "ぅ", "あ"];
    const arr3 = ["べ", "ひ", "ぽ", "ふ", "ば"];
    const arr4 = ["エ", "イ", "オ", "ウ", "ア"];
    const arr5 = ["エ", "ィ", "オ", "ゥ", "ア"];
    const arr6 = ["べ", "ピ", "ポ", "ブ", "ハ"];
    const arr7 = ["べ", "ィ", "ポ", "ゥ", "は"];
    expect(sortJapanese(arr1)).toEqual(["あ", "い", "う", "え", "お"]);
    expect(sortJapanese(arr2)).toEqual(["あ", "ぃ", "ぅ", "え", "お"]);
    expect(sortJapanese(arr3)).toEqual(["ば", "ひ", "ふ", "べ", "ぽ"]);
    expect(sortJapanese(arr4)).toEqual(["ア", "イ", "ウ", "エ", "オ"]);
    expect(sortJapanese(arr5)).toEqual(["ア", "ィ", "ゥ", "エ", "オ"]);
    expect(sortJapanese(arr6)).toEqual(["ハ", "ピ", "ブ", "べ", "ポ"]);
    expect(sortJapanese(arr7)).toEqual(["ィ", "ゥ", "は", "べ", "ポ"]);
  });
  test("to Japanese Date String", () => {
    const date1 = new Date("2024/7/18");
    const date2 = new Date("2000/1/1");
    const date3 = new Date("1913/3/21");
    expect(toJapaneseDateString(date1)).toBe("令和6/7/18");
    expect(toJapaneseDateString(date2)).toBe("平成12/1/1");
    expect(toJapaneseDateString(date3)).toBe("大正2/3/21");
  });
});
