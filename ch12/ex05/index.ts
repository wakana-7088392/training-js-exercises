import * as fs from "fs";

/**
 * 指定されたファイルパスを受け取り、そのファイルを改行コード \n の出現ごとに分割して返すジェネレータ関数
 * @param filepath ファイルのパス
 */
export function* readLines(filepath: string): Generator<string, void, unknown> {
  // バッファのサイズを指定し、このサイズごとに読み込むようにする
  const bufferSize = 1024;
  const buffer = Buffer.alloc(bufferSize);
  // 引数で渡されたファイルパスを読み取り専用で開く
  const fd = fs.openSync(filepath, "r");
  let leftover = "";

  try {
    let num: number;
    while ((num = fs.readSync(fd, buffer, 0, bufferSize, null))) {
      let data = leftover + buffer.toString("utf8", 0, num);
      let lines = data.split("\n");
      // バッファ最後にある未処理の部分を取り出す。なければ空文字を返す
      leftover = lines.pop() || "";
      // next()が呼び出されるごとに分割された\nで分割された文字列が返ってくる
      for (const line of lines) {
        yield line;
      }
    }
    // 文字列があれば返す
    if (leftover) {
      yield leftover;
    }
  } finally {
    // 正常時でもエラー時でもクローズ処理を行うようにする
    fs.closeSync(fd);
  }
}
