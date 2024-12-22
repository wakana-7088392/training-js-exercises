//abs や factorial のコードを参考にし、フィボナッチ数を計算する関数 fib を作成しなさい。
//例えば fib(5) は 5 を返し、fib(75) は 2111485077978050 を返さなければならない。
export function fib(x) {
  if (x === 0) throw "err";
  if (x === 1) return 1;
  let array = [1, 1];
  while (array.length < x) {
    array.push(array[array.length - 2] + array[array.length - 1]);
  }
  return array[x - 1];
}
