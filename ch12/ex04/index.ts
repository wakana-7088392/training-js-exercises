function* serial(): Generator<number> {
  for (let i = 2; true; i++) {
    yield i;
  }
}

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

export function* primes(
  iter: Generator<number> = serial()
): Generator<number, void, unknown> {
  const prime = iter.next().value;
  yield prime;
  yield* primes(filter(iter, (n) => n % prime !== 0));
}
