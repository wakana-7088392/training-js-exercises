/**
 * ループを使用してべき乗を計算する関数
 *
 * x:べき乗の対象となる整数
 * n:乗算する回数
 */
export const loopCal = (x: number, n: number) => {
  if (n === 0) return 1;
  let result = x;
  if (n === 1) return result;
  for (let i = 2; i <= n; i++) {
    result = result * x;
  }
  return result;
};

/**
 * 再帰を使用してべき乗を計算する関数
 *
 * x:べき乗の対象となる整数
 * n:乗算する回数
 * acc:計算結果、デフォルトは1
 */
export const recursionCal = (x: number, n: number, acc: number = 1) => {
  if (n === 0) return acc;
  return recursionCal(x, n - 1, acc * x);
};
