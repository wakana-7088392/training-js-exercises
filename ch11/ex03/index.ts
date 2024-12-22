let uInt32Array = new Uint32Array([
  100, 200, 400, 1600, 50000, 100000, 125000, 150000, 2000000, 10000000,
]);

export function changeLittleToBig(uInt32Array: Uint32Array) {
  const res = new Uint32Array(uInt32Array.length);
  const input = new DataView(uInt32Array.buffer);
  const output = new DataView(res.buffer);
  for (let i = 0; i < uInt32Array.length; i++) {
    const offset = i * 4;
    // リトルエンディアンで取り出した値をビッグエンディアン形式に変えて書き戻す。
    output.setUint32(offset, input.getUint32(offset, true), false);
  }
  return res;
}

export function changeBigToLittle(uInt32Array: Uint32Array) {
  const res = new Uint32Array(uInt32Array.length);
  const input = new DataView(uInt32Array.buffer);
  const output = new DataView(res.buffer);
  for (let i = 0; i < uInt32Array.length; i++) {
    const offset = i * 4;
    // ビッグエンディアンで取り出した値をリトルエンディアン形式に変えて書き戻す。
    output.setUint32(offset, input.getUint32(offset, false), true);
  }
  return res;
}

// 値を１つずつ出力して確認する関数
export function printArray(uInt32Array: Uint32Array, littleEndian: boolean) {
  const dataView = new DataView(uInt32Array.buffer);
  for (let i = 0; i < uInt32Array.length; i++) {
    const offset = i * 4;
    console.log(dataView.getUint32(offset, littleEndian));
  }
}

// 配列に置き換える関数
export function getArray(uInt32Array: Uint32Array, littleEndian: boolean) {
  const res = new Array();
  const dataView = new DataView(uInt32Array.buffer);
  for (let i = 0; i < uInt32Array.length; i++) {
    const offset = i * 4;
    res.push(dataView.getUint32(offset, littleEndian));
  }
  return res;
}

printArray(uInt32Array, true);
const res1 = changeLittleToBig(uInt32Array);
console.log("-----------------");
console.log(getArray(res1, false));
console.log("-----------------");
printArray(res1, false);
const res2 = changeBigToLittle(res1);
console.log("-----------------");
console.log(getArray(res2, true));
console.log("-----------------");
printArray(res2, true);
