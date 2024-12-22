// zip1のマジックバイト
const demoData = new Uint8Array([0x50, 0x4b, 0x03, 0x04, 0x00, 0x00, 0x00]);

export function detectFileType(data: ArrayBuffer) {
  interface obj {
    [key: string]: any;
  }
  // 複数パターンあるものは一つのオブジェクトにして、値を二次元配列にすると追加等メンテがしやすいコードになりそう
  const fileTypes: obj = {
    PDF: new Uint8Array([
      0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34, 0x0a, 0x25, 0xc3, 0xa4,
      0xc3, 0xbc, 0xc3, 0xb6,
    ]),
    ZIP1: new Uint8Array([0x50, 0x4b, 0x03, 0x04, 0x00, 0x00, 0x00]),
    ZIP2: new Uint8Array([0x50, 0x4b, 0x05, 0x06, 0x00, 0x00]),
    ZIP3: new Uint8Array([0x50, 0x4b, 0x07, 0x08, 0x00, 0x00]),
    GIF1: new Uint8Array([0x47, 0x49, 0x46, 0x38, 0x37, 0x61, 0x00, 0x00]),
    GIF2: new Uint8Array([0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x00, 0x00]),
    PNG: new Uint8Array([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00,
    ]),
  };

  let dv = new DataView(data);

  for (let key of Object.keys(fileTypes)) {
    const value = fileTypes[key];
    // 配列の長さが異なる場合は次のループにいく
    if (value.length !== data.byteLength) continue;
    // 値が異なる段階で次のループへいく
    for (let i = 0; i < data.byteLength; i++) {
      if (value[i] !== dv.getUint8(i)) break;
    }
    // ZIPとGIFについては複数のパターンがあるため
    // いずれかのパターンに当てはまる場合は該当の拡張子の文字列を返す
    if (key === "ZIP1" || key === "ZIP2" || key === "ZIP3") return "ZIP";
    if (key === "GIF1" || key === "GIF2") return "GIF";
    return key;
  }
  return "UNKNOWN";
}
