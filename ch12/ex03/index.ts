/**
 * p.372で例示されている、throw()を使ってリセットを行うカウンタのようなジェネレータを実装しなさい。
 * ・増加し続ける整数を生成する、カウンタのようなジェネレータ
 * ・throw()メソッドを使って例外を送ることで、カウンタをゼロに初期化する
 */

export function* counter() {
  let num = 0;
  for (;;) {
    try {
      yield num++;
    } catch (e) {
      // throw()が呼び出されたタイミングで初期化し、この場合は初期値0を返す。
      console.log("初期化します。");
      num = 0;
      yield num++;
    }
  }
}

function count() {
  const c = counter();
  // 0から10までカウントし、10を超えたら初期化する
  for (let i = 0; i < 23; i++) {
    if (i === 11 || i === 21) {
      console.log(c.throw(new Error("error")).value);
    }
    console.log(c.next().value);
  }
}
