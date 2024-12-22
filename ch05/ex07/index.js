function f() {
  try {
    return true;
  } finally {
    return false;
  }
}

console.log(f());

/**
 * 予想：falseが出力される
 * 結果：falseが出力される
 *
 * 理由：教材p.131によれば
 *      「return文<中略>で処理がtryブロックから移動する場合は、
 *        処理が移動する前にfinallyブロックが実行されます。」
 *       と記載があり、
 *       今回の場合は、return trueでtrueがreturn文によって返される前に
 *       finallyブロックに移動してfalseがreturnされたため。
 */
