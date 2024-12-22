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

function f1() {
  // NOTE: f2 との比較用 (注: () => wait(...) は () => { return wait(...); } と同じことに注意
  //
  // 回答:
  // 3秒後に A が出力され、その2秒後に B が出力され、その1秒後に C が出力される。
  //
  // 説明:
  // wait3 の解決後に logA が実行され、wait2().then(logB) の解決後 (2秒後に B 出力) に wait1().then(logC) が実行されるため。
  //
  // 図解:
  //  wait3
  // |---------------|
  //                  logA
  //                 |-|
  //                    wait2
  //                   |----------|
  //                               logB
  //                              |-|
  //                                 wait1
  //                                |-----|
  //                                       logC
  //                                      |-|
  wait3()
    .then(logA)
    .then(() => wait2().then(logB))
    .then(() => wait1().then(logC));
}

function f2() {
  // NOTE: 2つ目の then の中で return が無くなっていることに注意 (典型的なミス)
  //
  // 解答例:
  // 3秒後に A が出力され、その1秒後に C が出力され、その1秒後に B が出力される。
  // 2つ目の .then のコールバック関数が値を return していないため、この .then が返す Promise は即解決される。
  // このため logA() の実行すぐ後に wait1().then(...) が実行され C が先に出力される。
  //
  // 図解:
  //  wait3
  // |---------------|
  //                  logA
  //                 |-|
  //                    wait2
  //                   |----------|
  //                               logB
  //                              |-|
  //                  wait1
  //                 |-----|
  //                        logC
  //                       |-|
  wait3()
    .then(logA)
    .then(() => {
      wait2().then(logB);
    })
    .then(() => wait1().then(logC));
}

function f3() {
  // NOTE: then のコールバック内の例外は try/catch でキャッチできるだろうか
  /**
   * 予想：
   * キャッチできる
   * 結果：
   * キャッチできない
   * 結果詳細：
   * 即座にC、Aの順で出力された後、Error:Xがキャッチされないままスローされる。
   * 理由(説明)：
   * 非同期処理のためerrXでErrorがスローされる前にtry文を抜けてしまっているから。
   * finallyにあるlogC()が即座に実行されていることからも、errXが動くよりも先にtry文から抜けていることがわかる。
   */
  try {
    wait(0).then(logA).then(errX);
  } catch (e) {
    logB();
  } finally {
    logC();
  }
}

function f4() {
  // NOTE: f5 との比較用
  /**
   * 予想：Aが出力された後、Bが出力される。
   * 結果：Aが出力した後、Bと100が出力される。
   * 結果詳細：2.8秒後にAが出力された後、0.9秒後にBと100が出力される。
   * 理由(説明)：1つ目のthenでlogAが出力され、40がreturnされる。その後2つ目のthenでlogBが出力されて100がreturnされる。
   * 　　　最後のthenで100が引数となり、logで100が出力される。
   */
  wait2()
    .then(() => {
      logA();
      return 40;
    })
    .then((value) =>
      wait(1000).then(() => {
        logB();
        return 100;
      })
    )
    .then((v) => log(v));
}

function f5() {
  // NOTE: 2つ目の then の引数が関数でなく Promise になっている (典型的なミス)
  /**
   * 予想：
   * f4とは異なり、最後の出力が40になる？
   * 結果：
   * Bが出力された後にAと40が出力される。
   * 結果詳細：
   * 1.7秒後にBが出力された後、0.9秒後にAと一つ目のthenでreturnされる40が最後のthenのlogで出力される。
   * 理由(説明)：
   * 2つ目のthenの引数が関数ではなくPromiseになっていることが原因でwait2が呼び出された後即座に2つ目のthenのwait1が即座に実行される。
   * そのためwait1の待ち時間が先に終わり、Bが出力され、その後にwait2の待ち時間が終わりAが出力される。
   * 2つ目のthenは関数ではないためおそらく無視されており、returnされた100は出力されない。
   * 1つ目のthenで40がreturnされ、最後のthenのlogでは40が出力される。
   */
  wait2()
    .then(() => {
      logA();
      return 40;
    })
    .then(
      wait1().then(() => {
        logB();
        return 100;
      })
    )
    .then((v) => log(v));
}

function f6() {
  // NOTE: 1つの Promise に対し then を2回呼び出すとどうなるか
  /**
   * 予想：
   * 2回とも実行される。
   * 結果：
   * A,B,Cの順で出力される。
   * 結果詳細：
   * 1.6秒後にAが出力された後、1秒後にBが出力され、さらに1秒後にCが出力される。
   * 理由(説明)：
   * 2つのp.then()が非同期で処理されるため、1つ目の.then()の処理が始まると即座に2つ目の.then()の処理が始まるから。
   * pのlogAが出力、解決した後、2つのthenが動き出してlogBとlogCがそれぞれのタイミングで出力されている。
   */
  const p = wait1().then(logA);
  p.then(() => wait1()).then(logB);
  p.then(() => wait2()).then(logC);
}

function f7() {
  // NOTE: 2つ目の wait の引数が実行される差には p は解決済み
  // (= 解決済みの Promise の then を呼び出すとどうなるか)
  /**
   * 予想：
   * A,C,Bの順で出力される。
   * 結果：
   * A,B,Cの順で出力される。
   * 結果詳細：
   * 1.8秒後にAが出力された後、0.9秒後にほぼ同時にBとCが出力される。
   * 理由(説明)：
   * wait1とwait2がほぼ同時に実行されるから。
   * 先にwait1が解決するためAが出力される。その後処理を開始してから2秒後(wait1が解決してから1秒後)にBが出力され、
   * 最後のthenも即座に実行されるためCがBとほぼ同タイミングで出力される。
   */
  const p = wait1().then(logA);
  wait2()
    .then(() => {
      return p.then(logB);
    })
    .then(logC);
}

function f8() {
  // NOTE: f9, f10 との比較用
  /**
   * 予想：
   * XとAだけ出力される。
   * 結果：
   * XとAだけ出力される。
   * 結果詳細：
   * 1.7秒後にXとAがほぼ同時に出力される。
   * 理由(説明)：
   * wait1で1秒待ったあとに即座にerrXでエラーがthrowされるから。
   * throwされたエラーが.catchでキャッチされてXが出力された後、即座に.finallyが動きAが出力される。
   */
  wait1()
    .then(errX)
    .then(errY)
    .catch((e) => log(e.message))
    .finally(logA);
}

function f9() {
  // NOTE: f12 との比較用
  /**
   * 予想：
   * YとAが出力される。
   * 結果：
   * YとAが出力される。
   * 結果詳細：
   * 1.7秒後にYとAがほぼ同時に出力される。
   * 理由(説明)：
   * 最初のthenはスルーされ、エラーが.catchでキャッチされるから。
   * wait1で1秒待ったあと、1つ目のthenが実行される。2つ目のthenでエラーがthrowされ、
   * throwされたエラーが.catchでキャッチされてYが出力された後、即座に.finallyが動きAが出力される。
   */
  wait1()
    .then(() => 42)
    .then(errY)
    .catch((e) => log(e.message))
    .finally(logA);
}

function f10() {
  // NOTE: then(r, c) と then(r).catch(c) は等しいか？
  /**
   * 予想：異なると思う。
   * 結果：Aが出力され、エラーがthrowされるため異なる。
   * 結果詳細：1.7秒後にAの出力とエラーのthrowが発生する。
   * 理由(説明)：
   * 2つ目のthenの引数eは1つ目（前）のthenのPromiseの結果が来るから。
   * 試しに1つ目のthenをerrXにしたところXとAが出力された。
   * thenのreject関数は一つ前のthenでreturnされる値が引数になる。今回の場合は42なので2つ目のthenのreject関数は無視される。
   * errYがthrowされるが、それ以降はfinallyしかないためそのままエラーはthrowされる。
   */
  wait1()
    .then(() => 42)
    .then(errY, (e) => log(e.message))
    .finally(logA);
}

function f11() {
  // f12 との比較用: new Promise 内の throw は .catch でキャッチできるか？
  /**
   * 予想：
   * できると思う。
   * 結果：
   * できた。
   * 結果詳細：
   * 実行とほぼ同時にXが出力された
   * 理由(説明)：
   * エラーがthrowされるとPrimiseのreject関数を呼び出すのと同じ効果があるから？
   * そのため、.catchでthrowしたエラーをキャッチすることができ、Xが出力される。
   */
  new Promise((resolve, reject) => {
    errX();
  }).catch((e) => log(e.message));
}

function f12() {
  // new Promise 内だがコールバック関数で throw した場合は？
  /**
   * 予想：
   * キャッチされない
   * 結果：
   * キャッチされない
   * 結果詳細：
   * エラーがキャッチされることなくthrowされる。
   * 理由(説明)：
   * 非同期でsetTimeout()とPromiseの処理が別々に動くため。
   * そのため、errXのエラーがキャッチされず、throwされる。
   */
  new Promise((resolve, reject) => {
    setTimeout(() => errX(), 0);
  }).catch((e) => log(e.message));
}

f12();
