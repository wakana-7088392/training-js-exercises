/**
 * 1.自然数nと英数文字cを引数にとり、文字cをn回コンソール出力してから文字cをn個含む配列を返す
 */
export const resArray = (n, c) => {
  let array = new Array();
  for (let i = 1; i <= n; i++) {
    console.log(c);
    array = [...array, c];
  }
  return array;
};
/**
 * 引数：引数が2つあるため必要
 * 戻り値：return文以外もあるため必要
 */

/**
 * 2.数値xを引数にとり、xの二乗の数値を返す
 */
export const res = x => x ** 2;
/**
 * 引数：引数が1つしかないため不要
 * 戻り値：処理としてはべき乗演算子を使用してxの2乗の数値を返すだけなので不要
 */

/**
 * 3.引数なしで、現在時刻のプロパティnowを含むオブジェクトを返す
 */
export const obj = () => ({
  now: new Date(),
});

/**
 * 引数：引数がないアロー関数であるため必要
 * 戻り値：オブジェクトリテラルを返却する場合は丸括弧を区別するために必要
 */
const res1 = resArray(3, "abc123");
const res2 = res(2);
const res3 = obj();
console.log(res1);
console.log(res2);
console.log(res3["now"]);
