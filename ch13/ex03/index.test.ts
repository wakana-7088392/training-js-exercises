import * as fs from "fs";
import { readdir, stat } from "./index.ts";

describe("ch13/ex03", () => {
  // fs.readdirとfs.Statをモック化
  let mReaddir: jest.SpyInstance;
  let mStat: jest.SpyInstance;

  beforeEach(() => {
    mReaddir = jest.spyOn(require("fs"), "readdir");
    mStat = jest.spyOn(require("fs"), "stat");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("fs.readdirのPromise変換", () => {
    // ファイルを固定
    const mockFiles = [
      { name: "file01.txt", isFile: () => true, isDirectory: () => false },
      { name: "file02.txt", isFile: () => true, isDirectory: () => false },
    ] as fs.Dirent[];

    test("readdir", async () => {
      mReaddir.mockImplementation((path, options, callback) => {
        callback(null, mockFiles);
      });

      const files = await readdir("/some/path");
      expect(files).toEqual(mockFiles);
      expect(mReaddir).toHaveBeenCalledWith(
        "/some/path",
        undefined,
        expect.any(Function)
      );
      mReaddir.mockRestore();
    });

    test("readdir error", async () => {
      const mockError = new Error("Error");
      mReaddir.mockImplementation((path, options, callback) => {
        callback(mockError, mockFiles);
      });

      await expect(readdir("/some/path")).rejects.toThrow("Error");
      expect(mReaddir).toHaveBeenCalledWith(
        "/some/path",
        undefined,
        expect.any(Function)
      );
      mReaddir.mockRestore();
    });
  });

  describe("fs.statsのPromise変換", () => {
    test("stats", async () => {
      const mockStats = {
        size: 1024,
        isFile: () => true,
        isDirectory: () => false,
      } as fs.Stats;

      mStat.mockImplementation((path, callback: any) => {
        callback(null, mockStats);
      });

      const stats = await stat("/some/file");
      expect(stats).toEqual(mockStats);
      expect(mStat).toHaveBeenCalledWith("/some/file", expect.any(Function));
      mStat.mockRestore();
    });

    test("stats error", async () => {
      const mockError = new Error("Error");
      mStat.mockImplementation((path, callback: any) => {
        callback(mockError);
      });

      await expect(stat("/some/file")).rejects.toThrow("Error");
      expect(mStat).toHaveBeenCalledWith("/some/file", expect.any(Function));
      mStat.mockRestore();
    });
  });
});
