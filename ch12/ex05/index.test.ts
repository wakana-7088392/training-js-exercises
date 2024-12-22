import * as fs from "fs";
import { readLines } from "./index.ts";

describe("readLines", () => {
  const filePath = "./test.txt";

  afterAll(() => {
    // テスト用のモックファイルを削除
    fs.unlinkSync(filePath);
  });

  test("末尾に改行がある", () => {
    fs.writeFileSync(filePath, "line1\nline2\nline3\n", "utf8");
    let line = readLines(filePath);
    expect(line.next().value).toEqual("line1");
    expect(line.next().value).toEqual("line2");
    expect(line.next().value).toEqual("line3");
  });

  test("末尾に改行がない", () => {
    fs.writeFileSync(filePath, "line1\nline2\nline3", "utf8");
    let line = readLines(filePath);
    expect(line.next().value).toEqual("line1");
    expect(line.next().value).toEqual("line2");
    expect(line.next().value).toEqual("line3");
  });

  test("空文字", () => {
    fs.writeFileSync(filePath, "", "utf8");
    let line = readLines(filePath);
    expect(line.next().value).toBeUndefined();
  });

  test("膨大なデータがあり、指定したバッファサイズをまたぐ", () => {
    // メモ帳で試したら1,244バイトとのこと、このファイルを使用することで境界線を確認できるのでは…？
    // 17回目が1024バイトの境目
    const largeData = Array(20)
      .fill("あいうえおかきくけこさしすせそたちつてと")
      .join("\n");
    fs.writeFileSync(filePath, largeData);
    let line = readLines(filePath);
    for (let i = 0; i < 20; i++) {
      expect(line.next().value).toEqual(
        "あいうえおかきくけこさしすせそたちつてと"
      );
    }
  });
});
