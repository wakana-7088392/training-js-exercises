import * as fs from "fs";
import * as path from "path";

import { walk } from "./index.ts";

describe("ch12/ex06", () => {
  // readdirSyncをモック化
  const mReaddirSync = jest.spyOn(fs, "readdirSync");
  // 返却するパスを固定化
  mReaddirSync.mockImplementation((rootPath): any => {
    // パスの境界をpath.sepで表すことでこの環境外でもなるべく使えるようにする
    if (rootPath === path.sep + "root") {
      return [
        { name: "file01.txt", isDirectory: () => false },
        { name: "dir1", isDirectory: () => true },
      ];
    } else if (rootPath === path.sep + "root" + path.sep + "dir1") {
      return [
        { name: "file11.txt", isDirectory: () => false },
        { name: "file12.txt", isDirectory: () => false },
        { name: "dir2", isDirectory: () => true },
      ];
    }
    return [];
  });

  test("walk", () => {
    const w = walk(path.sep + "root");
    expect(w.next().value).toEqual({
      path: path.sep + "root" + path.sep + "file01.txt",
      isDirectory: false,
    });
    expect(w.next().value).toEqual({
      path: path.sep + "root" + path.sep + "dir1",
      isDirectory: true,
    });
    expect(w.next().value).toEqual({
      path: path.sep + "root" + path.sep + "dir1" + path.sep + "file11.txt",
      isDirectory: false,
    });
    expect(w.next().value).toEqual({
      path: path.sep + "root" + path.sep + "dir1" + path.sep + "file12.txt",
      isDirectory: false,
    });
    expect(w.next().value).toEqual({
      path: path.sep + "root" + path.sep + "dir1" + path.sep + "dir2",
      isDirectory: true,
    });
  });
});
