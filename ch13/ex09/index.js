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

async function i1() {
  // NOTE: any で1つ Promise が解決された時に他の Promise はどうなるだろうか
  /**
   * 予想：
   * 42以外の値は出力されない。
   * 結果：
   * 最初に42が出力された後に100が出力される。
   * 結果詳細：
   * 開始してから1.7秒後に1回目のlogが動き、その際は42が出力される。
   * その後2.0秒後に2回のlogが動き、その際は100が出力される。
   * なお、wait3やwait(5000)など秒数を増やしたが、0が出力されることはなかった。
   * 理由(説明)：
   * Promise.anyでは並行処理が行われ、最初に解決されたものを返して他の処理が完了することを待たないから。
   * wait1が先に完了してvに42が代入されるため、最初のlogでは42が出力される。
   * その後、wait2が完了し、vに100を代入するという処理が動くため、vの値が変化する。そのため2回目のlogでは100が出力される。
   * wait2ではthenが2回存在し、2回目のthenでは0を返す処理があるが、既にPromiseは解決済なので無視されてしまうのではないだろうか。
   */
  let v = 0;

  v = await Promise.any([
    wait1().then(() => 42),
    wait2()
      .then(() => (v = 100))
      .then(() => 0),
  ]);

  log(v);
  await wait2();
  log(v);
}

// i1();

async function i2() {
  /**
   * 予想：
   * C,B,Aの順番で出力された後、Aが出力される。
   * 結果：
   * C,B,Aの順番で出力された後、['A', 'B', 'C']が出力される。
   * 結果詳細：
   * 開始してから1.7秒後にAが出力される。
   * その後1.0秒後にBが出力され、さらに1.0秒後にCが出力される。
   * Cが出力されるのとほぼ同時に配列が出力される。
   * 理由(説明)：
   * Promise.allの仕様が、Promiseが全て完了した後、
   * 全ての値を配列におさめて使用するようになっているから。
   */
  const v = await Promise.all([
    wait3().then(() => {
      logA();
      return "A";
    }),
    wait2().then(() => {
      logB();
      return "B";
    }),
    wait1().then(() => {
      logC();
      return "C";
    }),
  ]);
  log(v);
}

// i2();

async function i3() {
  // NOTE: all で引数の1つが失敗すると他の Promise はどうなるだろうか
  /**
   * 予想：
   * 他のPromiseも動いてはいる。
   * 結果：
   * errX以外は動いているように見える。
   * 結果詳細：
   * 出力結果としては、Y,42,B,0の順で出力される。
   * 開始した後、2.2秒後にYと42がほぼ同時に出力される。
   * その後、1.1秒後にBが出力され、2.0秒後に0が出力される。
   * 理由(説明)：
   * Promise.allで全て実行されるから。
   * またエラーのthrowは一つしかキャッチされないため、待機時間が短く早く終わるerrY
   * のみがキャッチされ、errXはキャッチされないままtry~catch文を抜けてしまうのではないか
   */
  let v = 42;
  try {
    await Promise.all([
      wait3().then(() => {
        v = 0;
        errX();
      }),
      wait2().then(() => {
        logB();
        return "B";
      }),
      wait1().then(() => {
        errY();
      }),
    ]);
  } catch (e) {
    log(e.message);
    log(v);
    await wait3();
    log(v);
  }
}

// i3();

async function i4() {
  // NOTE: i5, i6 との比較用 (直列に処理を実行したいものとする)
  /**
   * 予想：
   * 0から4までの数字が、5秒、4秒、3秒、2秒、1秒の間隔で出力される。最後にCOMPLETEDが出力される。
   * 結果：
   * 0から4までの数字が、だいたい5秒、4秒、3秒、2秒、1秒の間隔で出力される。4出力時とほぼ同時にCOMPLETEDが出力される。
   * 結果詳細：
   * 処理開始後、5.8秒後に0、その4.0秒後に1、その3.1秒後に2、その2.0秒後に3、その1.0秒後に4が出力された。
   * 4が出力されるのとほぼ同時にCOMPLETEDが出力された。
   * 理由(説明)：
   * for文で待機時間が調整されているから。
   */
  let p = Promise.resolve(null);
  for (let i = 0; i < 5; ++i) {
    p = p.then(() => wait((5 - i) * 1000).then(() => log(i)));
  }
  return p.then(() => log("COMPLETED"));
}

// i4();

async function i5() {
  // NOTE: このコードは期待通りの挙動をすると考えられるだろうか？(典型的なミス)
  /**
   * 予想：
   *　i4とは異なる挙動をするため、期待通りの結果は得られない。
   * 結果：
   *　COMPLETEDが先に出力された後、だいたい1秒間隔で0から4までの数字が出力される。
   * 結果詳細：
   * 処理開始直後にCOMPLETEDが出力される。その後1.7秒後に4、その1.0秒後に3、その1.0秒後に2
   * その1.0秒後に1、その1.0秒後に0が出力される。
   * 理由(説明)：
   * for文の各iの値の処理が並行で処理されてしまうから？
   * i4でp.then(() => wait((5 - i) * 1000)となっている箇所がp.then(wait((5 - i) * 1000)となっていることで
   * 処理そのものがPromiseに戻り値として渡されているのではないか。Promise自体は解決しているのでfor文が次々周り、
   * for文自体は早々に抜けるため、COMPLETEDが先に出力されてしまう。その後各iごとのwaitの処理が並行で動き、waitの
   * 秒数が少ないものから順番にlog処理が動くため、4,3,2,1,0の順で出力されるのではないか。
   */
  let p = Promise.resolve(null);
  for (let i = 0; i < 5; ++i) {
    p = p.then(wait((5 - i) * 1000).then(() => log(i)));
  }
  return p.then(() => log("COMPLETED"));
}

// i5();

async function i6() {
  /**
   * 予想：
   *　i5と同じ結果になる。COMPLETEDの出力タイミングだけ異なる。
   * 結果：
   *　だいたい1秒間隔で0から4までの数字が出力され、最後にCOMPLETEDが出力される。
   * 結果詳細：
   * 処理開始後1.7秒後に4、その1.0秒後に3、その1.0秒後に2
   * その1.0秒後に1、その0.9秒後に0が出力される。
   * 理由(説明)：
   * 配列がmapによって再配置されることで5から各数値分差し引いた分の秒数待機した後log処理を行う5つの関数を持つ配列が生成される。
   * これらは同時並行で処理されるため、i5同様waitの秒数が少ないものから順番に4,3,2,1,0と出力される。
   * Promise.allによって配列内全ての処理が完了するまでCOMPLETEDを出力する処理は待機状態になるため、i5とは異なりCOMPLETEDが
   * 最後に出力されるようになる。
   */
  return Promise.all(
    [0, 1, 2, 3, 4].map((i) => wait((5 - i) * 1000).then(() => log(i)))
  ).then(() => log("COMPLETED"));
}

// i6();

async function i7() {
  // NOTE: i8 との比較用
  /**
   * 予想：
   * わからない。
   * 結果：
   * しばらく待機した後に10が出力される。
   * 結果詳細：
   * 11.7秒の待機の後、10が出力される。
   * 理由(説明)：
   * p1とp2が1秒ごとに交互にvの値を1加算して更新していき、Promise.allによって両方の処理が終わるまで待機されるから。
   */
  let v = 0;

  // 1秒待った後に2秒間隔で value の値を更新
  const p1 = async () => {
    await wait1();
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      v = next;
      log("p1:" + v);
      await wait2();
    }
  };

  // 2秒間隔で value の値を更新
  const p2 = async () => {
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      v = next;
      log("p2:" + v);
      await wait2();
    }
  };

  await Promise.all([p1(), p2()]);
  log(v);
}

// i7();

async function i8() {
  // NOTE: 複数の非同期処理が1つの変数に対し書き込みを行う場合、読み込みと書き込みの間に await が入るとどうなるだろうか
  /**
   * 予想：
   * i7のような交互の加算処理にawaitが入り込むことで最終的な出力値が変化する。
   * 結果：
   * しばらく待機したのち5が出力される。
   * 結果詳細：
   * 11.9秒待機したのち5が出力される。
   * 理由(説明)：
   * awaitが入りこむことで更新時にp1とp2で更新する値が同じ値になってしまうから。
   * 最初にp1でvの値が加算される。この時、vは初期の値である0なのでnextの値は1になる。
   * その後、wait2で待ち時間が発生する。
   * 次に1秒遅れでp2の処理が動くが、この時点でp1でvの値が更新されていないのでvは初期の値0のままである。
   * その結果p2のnextも1になる。
   * これにより、p1もp2もvに1を代入することになる。
   * 同様にこのループが5回発生するため、最終的な値は5になる。
   */
  let v = 0;

  const p1 = async () => {
    await wait1();
    for (let i = 0; i < 5; i++) {
      // NOTE: value の読み込み (value + 1) と書き込み (value = ...) の間に await が...
      const next = v + 1;
      await wait2();
      v = next;
      // log("p1:" + v);
    }
  };

  const p2 = async () => {
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      await wait2();
      v = next;
      // log("p2:" + v);
    }
  };

  await Promise.all([p1(), p2()]);
  log(v);
}

i8();
