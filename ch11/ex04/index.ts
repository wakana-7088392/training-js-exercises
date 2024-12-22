// これから (N, K) と (K, M) の行列の乗算を行う (この値は色々変更して試すこと)
// const [N, K, M] = [100, 200, 300];
const [N, K, M] = [10, 20, 30];
// イメージ：Aの列K(colsA:k)、行がN(rowsA:i)、Bの列がM(colsB:j)、行がK(rowsB:k)

// 配列版: (N, K) の行列を要素数 N * K の1次元配列で表現する ((i, j) は array[K * i + j] で参照)
const lhsA = Array(N * K)
  .fill(0.0)
  .map(() => Math.random());
const rhsA = Array(K * M)
  .fill(0.0)
  .map(() => Math.random());
const resultA = Array(N * M).fill(0.0);

function arrayMultiply() {
  resultA.fill(0.0);
  // 問題: ここで resultA に lhsA と rhsA の乗算結果を格納してね
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      for (let k = 0; k < K; k++) {
        // lhsA[K * i + k]：行列lhsAのi行k列目の要素を参照する。K個分その列には値があるためK * iで開始位置を特定する
        // lhsA[M * k + j]：行列lhsAのk行j列目の要素を参照する。M個分その列には値があるためM * kで開始位置を特定する
        resultA[N * i + j] += lhsA[K * i + k] * rhsA[M * k + j];
      }
    }
  }
  return resultA;
}

// 型付き配列版 (Float64Array 以外の型も試してみると良い)
const lhsB = new Float64Array(N * K).fill(0.0).map((_, i) => lhsA[i]);
const rhsB = new Float64Array(K * M).fill(0.0).map((_, i) => rhsA[i]);
const resultB = new Float64Array(N * M).fill(0.0);

function typedArrayMultiply() {
  resultB.fill(0.0);
  // 問題: ここで resultB に lhsB と rhsB の乗算結果を格納してね
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      for (let k = 0; k < K; k++) {
        resultB[N * i + j] += lhsB[K * i + k] * rhsB[M * k + j];
      }
    }
  }
}

const TEST_TIMES = 100;
const TESTS = [arrayMultiply, typedArrayMultiply];
function test(fn: any) {
  let result;
  for (let i = 0; i < TEST_TIMES; ++i) {
    result = fn();
  }
  return result;
}

// warmup
for (let i = 0; i < TESTS.length; ++i) {
  test(TESTS[i]);
}

// 測定開始
for (let i = 0; i < TESTS.length; ++i) {
  const start = performance.now();
  test(TESTS[i]);
  const end = performance.now();
  console.log(`${TESTS[i].name}: ${end - start}`);
}
