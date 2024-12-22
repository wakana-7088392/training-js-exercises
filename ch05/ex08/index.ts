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
 * 結果：5が出力される。
 *
 * 理由：catchブロックに例外を処理するコードがないため、finallyブロックに移動し、
 * 　　　finallyブロックでcontinueしてループが継続するため。
 * for文をbreakすることがない
 * break文はループ文やswitch文を終了させるもの。
 */
