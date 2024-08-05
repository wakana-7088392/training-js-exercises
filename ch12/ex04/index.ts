function* primes() {}

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
