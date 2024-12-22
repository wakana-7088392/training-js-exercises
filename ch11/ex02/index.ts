// f はオブジェクトを1つ引数に取る関数
export function cache(f: (obj: object) => any) {
  const cache = new WeakMap();
  return function (obj: object) {
    // キャッシュが残っている場合はそこから値を返す
    if (cache.has(obj)) {
      return cache.get(obj);
    } else {
      // キャッシュがなければ関数を呼び出して結果をsetしたうえで返す。
      const res = f(obj);
      cache.set(obj, res);
      return res;
    }
  };
}

export function slowFn(obj: Object) {
  // 時間のかかる処理
  for (let i = 0; i < 100000; i++) {
    const num1 = 10 + i;
    for (let j = 0; j < 100000; j++) {
      const num2 = 10 + j;
    }
  }
  return JSON.stringify(obj);
}

// cachedSlowFnを同じ引数で複数回呼び出すと、2回目以降はキャッシュが返る
export const cachedSlowFn = cache(slowFn);
