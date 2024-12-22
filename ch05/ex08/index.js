var x = 0;
for (var i = 1; i <= 5; i++) {
    x = i;
    try {
        throw Error();
    }
    catch (_a) {
        break;
    }
    finally {
        continue;
    }
}
console.log(x);
/**
 * 予想：5が出力される。
 * 結果：5が出力される。
 *
 * 理由：catchブロックに例外を処理するコードがないため、finallyブロックに移動し、
 * 　　　finallyブロックでcontinueするためループが継続するため。
 */
