let res = "";
// const demoNormal = function () {
//   try {
//     res += "try\n";
//   } catch (e) {
//     res += "catch\n";
//   } finally {
//     res += "finally\n";
//   }
//   return res;
// };
// console.log("正常な処理:\n" + demoNormal());
const demoFail = function () {
  try {
    res += "try\n";
    throw new Error();
  } catch (e) {
    res += "catch\n";
  } finally {
    res += "finally\n";
  }
  return res;
};
console.log("エラー発生時:\n" + demoFail());

/** 出力結果
 * 正常な処理:
 * try
 * finally
 *
 * エラー発生時:
 * try
 * finally
 * try
 * catch
 * finally
 */
