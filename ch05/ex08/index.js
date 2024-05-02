let x = 0;
for (let i = 1; i <= 5; i++) {
  x = i;
  try {
    throw Error();
  } catch {
    break;
  } finally {
    continue;
  }
}
console.log(x);
/**
 * 予想：5が出力される。
 * 結果：
 *
 * 理由：
 */
