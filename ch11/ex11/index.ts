// N 回何もしないループの時間を返す
function costOfLoop(N: number) {
  const start = performance.now();
  for (let i = 0; i < N; i++) {}
  const end = performance.now();
  return end - start;
}

// N 回 "Hello".length を実行 + N 回何もしないループの時間を返す
function costOfLengthPlusLoop(N: number) {
  const str = "Hello";
  let res = 0;
  const start = performance.now();
  for (let i = 0; i < N; i++) {
    res = str.length;
  }
  const end = performance.now();

  if (res !== 5) {
    throw new Error("something is wrong");
  }
  return end - start;
}

// "Hello".length 1回あたりの時間を返す
function costOfLength(N: number) {
  const lhs = costOfLengthPlusLoop(N);
  console.log(`lhs = ${lhs}`);
  const rhs = costOfLoop(N);
  console.log(`rhs = ${rhs}`);
  return (lhs - rhs) / N;
}

// 以下を変更して実験しなさい
console.log(costOfLength(10000));
console.log(costOfLength(10000));
console.log(costOfLength(10000));
console.log(costOfLength(100000));
console.log(costOfLength(1000000));
console.log(costOfLength(10000000));
console.log(costOfLength(100000000));
console.log(costOfLength(1000000000));
console.log(costOfLength(1000000000));
console.log(costOfLength(1000000000));
