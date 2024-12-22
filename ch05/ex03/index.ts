export const checkHolidayIfElse = (day: string) => {
  if (day === "土" || day === "日") {
    return true;
  } else if (
    day === "月" ||
    day === "火" ||
    day === "水" ||
    day === "木" ||
    day === "金"
  ) {
    return false;
  } else {
    throw "曜日を1文字だけ引数に渡してください";
  }
};

export const checkHolidaySwitch = (day: string) => {
  switch (day) {
    case "土":
      return true;
    case "日":
      return true;
    case "月":
      return false;
    case "火":
      return false;
    case "水":
      return false;
    case "木":
      return false;
    case "金":
      return false;
    default:
      throw "曜日を1文字だけ引数に渡してください";
  }
};

/**
 * if-else文
 * 　2択の場合はわかりやすい。
 * switch文
 * 　複数選択肢がある場合はわかりやすい。
 *
 * falseのものは全てdefaultでも問題なかった
 *
 */
