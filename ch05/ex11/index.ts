const f = () => {
  const a = 100;
  const b = 200;
  console.log(a);
  console.log(b);
  debugger;
  console.log(a);
};
f();

/** node inspect index.js
 * で実行するとデバッグ状態に入る
 * コマンドはhelpで確認可能
 * nはnext
 * replで値の読み取り(read)、評価(eval)、出力(print)、更なる入力(loop)
 * が可能で、6行目のデバッグ時にreplコマンド後「a=50」にすると、
 * 次のコンソールログは50が出力される。
 */
