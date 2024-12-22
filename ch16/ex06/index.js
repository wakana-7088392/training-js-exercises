import fs from "fs";

const path = "a.txt"
const newSize = 1024; // 1KB
fs.truncate(path, newSize, (err) => {
    if (err) {
        console.error("エラー発生", err);
    } else {
        console.log("正常終了")
    }
});