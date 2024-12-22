import { fetchFirstFileSize, fetchSumOfFileSizes } from "./index.ts";
import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

describe("ch13/ex04", () => {
  describe("fetchFirstFileSize", () => {
    let mReaddir: jest.SpyInstance;
    let mStat: jest.SpyInstance;

    beforeEach(() => {
      mReaddir = jest.spyOn(require("node:fs/promises"), "readdir");
      mStat = jest.spyOn(require("node:fs/promises"), "stat");
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    test("normal", async () => {
      const mockFiles = ["file1.txt", "file2.txt"];
      const mockStats = { size: 12345 };

      mReaddir.mockResolvedValue(mockFiles);
      mStat.mockResolvedValue(mockStats);

      const size = await fetchFirstFileSize("/mock/path");
      expect(size).toBe(12345);
    });

    test("empty", async () => {
      mReaddir.mockResolvedValue([]);

      const size = await fetchFirstFileSize("/mock/path");
      expect(size).toBeNull();
    });

    test("error", async () => {
      const mockError = new Error("Error");
      mReaddir.mockRejectedValue(mockError);

      await expect(fetchFirstFileSize("/mock/path")).rejects.toThrow("Error");
    });
  });

  describe("fetchSumOfFileSizes", () => {
    let mReaddir: jest.SpyInstance;
    let mStat: jest.SpyInstance;

    beforeEach(() => {
      mReaddir = jest.spyOn(require("node:fs/promises"), "readdir");
      mStat = jest.spyOn(require("node:fs/promises"), "stat");
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    test("normal", async () => {
      const mockFiles = ["file1.txt", "file2.txt"];
      const mockStats = [{ size: 12345 }, { size: 67890 }];

      mReaddir.mockResolvedValue(mockFiles);
      mStat.mockImplementation((path) => {
        if (path.endsWith("file1.txt")) return Promise.resolve(mockStats[0]);
        if (path.endsWith("file2.txt")) return Promise.resolve(mockStats[1]);
      });

      const totalSize = await fetchSumOfFileSizes("/mock/path");
      expect(totalSize).toBe(12345 + 67890);
    });

    test("error", async () => {
      const mockError = new Error("Error");
      mReaddir.mockRejectedValue(mockError);

      await expect(fetchSumOfFileSizes("/mock/path")).rejects.toThrow("Error");
    });
  });
});
