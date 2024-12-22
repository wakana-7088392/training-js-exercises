// 整数列を返すジェネレータ
function* serial(): Generator<number> {
  for (let i = 2; true; i++) {
    yield i;
  }
}

// p.363のfilter関数をジェネレータ関数にしたもの
function* filter<T>(
  iterable: Iterable<T>,
  predicate: (value: T) => boolean
): Generator<T> {
  const iter = iterable[Symbol.iterator]();
  for (let v = iter.next(); !v.done; v = iter.next()) {
    if (predicate(v.value)) {
      yield v.value;
    }
  }
}

// 呼び出しごとに素数を順番に返す無限ジェネレータ
export function* primes(
  iter: Generator<number> = serial()
): Generator<number, void, unknown> {
  const prime = iter.next().value;
  // 次の素数を返す
  yield prime;
  // filter関数の第2引数で直前でyieldで返した素数で割り切れない値のみが残るように篩にかける
  // 残った数列の先頭にくる値が次に返される値であり、次の素数である
  yield* primes(filter(iter, (n) => n % prime !== 0));
}
