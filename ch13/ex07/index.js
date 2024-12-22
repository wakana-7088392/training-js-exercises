import {
  wait,
  wait1,
  wait2,
  wait3,
  log,
  logA,
  logB,
  logC,
  errX,
  errY,
} from "../index.js";

// 秒数は0.01の桁で四捨五入

async function h1() {
  /**
   * 予想：
   *  A→B→Cの順番でログ出力される
   * 結果：
   *  A→B→Cの順番でログ出力される
   * 結果詳細：
   *  3.6秒後にAが出力され、その後2.0秒後にBが出力され、その後さらに1.3秒後にCが出力される。
   * 理由(説明)：
   * awaitによって各waitの処理が完了するまで待機するため。
   * wait3が完了する(3秒経過する)までawaitし、完了後処理が続いてlogAの処理が動く、さらにwait2が完了するまでawaitし…、というように順番に処理が動く。
   */
  try {
    await wait3();
    logA();
    await wait2();
    logB();
    await wait1();
    logC();
  } catch (e) {
    log(e.message);
  }
}

function h2() {
  // NOTE: h3 との比較用
  /**
   * 予想：
   * Xが出力される。
   * 結果：
   * Xが出力される。
   * 結果詳細：
   * 実行とほぼ同時にXが出力された。
   * 理由(説明)：
   * エラーがthrowされるとPrimiseのreject関数を呼び出すのと同じ効果があるから？
   * そのため、.catchでthrowしたエラーをキャッチすることができ、Xが出力される。(ex02のf11と同じ。)
   */
  new Promise(() => {
    errX();
  }).catch((e) => log(e.message));
}

function h3() {
  // NOTE: new Promise の引数が async function の場合、例外はどう扱われるだろう
  /**
   * 予想：
   *  エラーが発生する。
   * 結果：
   *  エラーが発生する。
   * 結果詳細：
   *  Error:Xがキャッチされないままスローされて失敗する。
   * 理由(説明)：
   *  キャッチされる前に失敗したとしてエラー出力されるから。
   *  async関数が例外をスローする場合は、関数が返したPromiseはこの例外で失敗する、との記載が教材p.405にある。
   */
  new Promise(async () => {
    errX();
  }).catch((e) => log(e.message));
}

async function h4() {
  // NOTE: 2つの例外は両方 catch できるか？
  /**
   * 予想：
   * キャッチできる
   * 結果：
   * キャッチできない
   * 結果詳細：
   * errXのthrowのみキャッチされて処理は終了する。
   * 理由(説明)：
   * p1でthrowされたエラーがキャッチされた後、try~catch文を抜けてしまうから。
   * p1とp2の変数にPromiseが代入された時点でwait2とwait1の処理が動く。
   * p2のwaitの方が早く処理が終わるがp1とp2の順でawaitされているためp1の処理
   * が先に動きerrXのエラーがthrowされる。そのエラーがcatch文でキャッチされてlog処理
   * が動きtry~catch文を抜ける。
   */
  try {
    const p1 = wait2().then(() => {
      errX();
    });
    const p2 = wait1().then(() => {
      errY();
    });
    await p1;
    await p2;
  } catch (e) {
    log(e.message);
  }
}

h4();
