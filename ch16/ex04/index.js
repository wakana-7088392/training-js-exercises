import iconv from "iconv-lite";
import fs from "fs";
import { PassThrough } from "stream";

const filename = "hello.txt"
const readStream = fs.createReadStream(filename);

const passThrough = new PassThrough();
passThrough.on("data", (chunk) => {
    const text = iconv.decode(chunk, "Shift_JIS");
    console.log('@' + text);
})

readStream.pipe(passThrough);