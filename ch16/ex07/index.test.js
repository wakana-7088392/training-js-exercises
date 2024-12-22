import * as fs from "fs";
import * as path from "path";
import { checkEntry } from "./index.js";

describe("ch16/ex07", () => {
    test("file", async () => {
        const filePath = path.join(__dirname, 'test.txt');
        fs.writeFileSync(filePath, 'Hello, world!');
        const result = await checkEntry(filePath);
        fs.unlinkSync(filePath); // テスト後にファイルを削除
        expect(result).toBe('file');
    })
    test("directory", async () => {
        const dirPath = path.join(__dirname, 'testDir');
        fs.mkdirSync(dirPath);
        const result = await checkEntry(dirPath);
        fs.rmdirSync(dirPath); // テスト後にディレクトリを削除
        expect(result).toBe('directory');
    })
    test("error", async () => {
        await expect(checkEntry("/invalid/path")).rejects.toThrow();
    })
})