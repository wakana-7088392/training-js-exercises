import * as fs from "fs/promises";
import * as path from "path";

import { walk } from "./index.ts";

describe("ch13/ex13", () => {
  // readdirをモック化
  let mReaddir: jest.SpyInstance;

  beforeEach(() => {
    mReaddir = jest.spyOn(fs, "readdir");
  });

  afterEach(() => {
    mReaddir.mockRestore();
  });

  test("null", async () => {
    mReaddir.mockResolvedValue([]);
    const result = [];
    for await (const data of walk(path.sep + "empty-dir")) {
      result.push(data);
    }
    expect(result).toEqual([]);
  });

  test("file only", async () => {
    mReaddir.mockResolvedValue([
      { name: "file1.txt", isDirectory: () => false },
      { name: "file2.txt", isDirectory: () => false },
    ]);
    const result = [];
    for await (const data of walk(path.sep + "files-dir")) {
      result.push(data);
    }
    expect(result).toEqual([
      {
        path: path.sep + "files-dir" + path.sep + "file1.txt",
        isDirectory: false,
      },
      {
        path: path.sep + "files-dir" + path.sep + "file2.txt",
        isDirectory: false,
      },
    ]);
  });

  test("directory and file", async () => {
    mReaddir.mockImplementation(async (rootPath) => {
      if (rootPath === path.sep + "root-dir") {
        return [
          { name: "subdir", isDirectory: () => true },
          { name: "file1.txt", isDirectory: () => false },
        ];
      } else if (rootPath === path.sep + "root-dir" + path.sep + "subdir") {
        return [{ name: "file2.txt", isDirectory: () => false }];
      }
      return [];
    });

    const result = [];
    for await (const data of walk(path.sep + "root-dir")) {
      result.push(data);
    }
    // 順序は任意であるため、受け取った配列が期待される配列の要素全てを含む場合に一致すると判定するexpect.arrayContainingを使用する
    expect(result).toEqual(
      expect.arrayContaining([
        {
          path: path.sep + "root-dir" + path.sep + "subdir",
          isDirectory: true,
        },
        {
          path: path.sep + "root-dir" + path.sep + "file1.txt",
          isDirectory: false,
        },
        {
          path:
            path.sep +
            "root-dir" +
            path.sep +
            "subdir" +
            path.sep +
            "file2.txt",
          isDirectory: false,
        },
      ])
    );
    // expect.arrayContainingだと受け取る配列が期待される配列に含まれない要素を含んでいても一致してしまう
    // そのため長さを確認する
    expect(result).toHaveLength(3);
  });
});
