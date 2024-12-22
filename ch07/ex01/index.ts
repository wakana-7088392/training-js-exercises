// 足し算
export const add = (a: number[][], b: number[][]) => {
  // 戻り値を入れる箱(2次元配列)を作る
  let table = new Array(Math.max(a.length, b.length));
  for (let x = 0; x < Math.max(a.length, b.length); x++) {
    table[x] = new Array(Math.max(a[x].length, b[x].length));
  }
  // 各要素ごとに計算する
  for (let x = 0; x < Math.max(a.length, b.length); x++) {
    for (let y = 0; y < Math.max(a[x].length, b[x].length); y++) {
      table[x][y] = (a[x][y] ?? 0) + (b[x][y] ?? 0);
    }
  }
  return table;
};

// 掛け算
// const mul = (a: number[][], b: number[][]) => {
//   // 戻り値を入れる箱(2次元配列)を作る
//   let table = new Array(Math.max(a.length, b.length));
//   for (let x = 0; x < Math.max(a.length, b.length); x++) {
//     table[x] = new Array(Math.max(a[x].length, b[x].length));
//   }
//   // 各要素ごとに計算する
//   for (let x = 0; x < Math.max(a.length, b.length); x++) {
//     for (let y = 0; y < Math.max(a[x].length, b[x].length); y++) {
//       table[x][y] = 0;
//     }
//   }
// };
