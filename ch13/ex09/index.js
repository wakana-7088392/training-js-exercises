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
   *
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
   * のみがキャッチされ、errXはキャッチされないままtry~catch文を抜けてしまう。
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
   *
   * 結果：
   *
   * 結果詳細：
   *
   * 理由(説明)：
   *
   */
  let p = Promise.resolve(null);
  for (let i = 0; i < 5; ++i) {
    p = p.then(() => wait((5 - i) * 1000).then(() => log(i)));
  }
  return p.then(() => log("COMPLETED"));
}

i4();

async function i5() {
  // NOTE: このコードは期待通りの挙動をすると考えられるだろうか？(典型的なミス)
  /**
   * 予想：
   *
   * 結果：
   *
   * 結果詳細：
   *
   * 理由(説明)：
   *
   */
  let p = Promise.resolve(null);
  for (let i = 0; i < 5; ++i) {
    p = p.then(wait((5 - i) * 1000).then(() => log(i)));
  }
  return p.then(() => log("COMPLETED"));
}

i5();

async function i6() {
  return Promise.all(
    [0, 1, 2, 3, 4].map((i) => wait((5 - i) * 1000).then(() => log(i)))
  ).then(() => log("COMPLETED"));
}

async function i7() {
  // NOTE: i8 との比較用
  let v = 0;

  // 1秒待った後に2秒間隔で value の値を更新
  const p1 = async () => {
    await wait1();
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      v = next;
      await wait2();
    }
  };

  // 2秒間隔で value の値を更新
  const p2 = async () => {
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      v = next;
      await wait2();
    }
  };

  await Promise.all([p1(), p2()]);
  log(v);
}

async function i8() {
  // NOTE: 複数の非同期処理が1つの変数に対し書き込みを行う場合、読み込みと書き込みの間に await が入るとどうなるだろうか
  let v = 0;

  const p1 = async () => {
    await wait1();
    for (let i = 0; i < 5; i++) {
      // NOTE: value の読み込み (value + 1) と書き込み (value = ...) の間に await が...
      const next = v + 1;
      await wait2();
      v = next;
    }
  };

  const p2 = async () => {
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      await wait2();
      v = next;
    }
  };

  await Promise.all([p1(), p2()]);
  log(v);
}
