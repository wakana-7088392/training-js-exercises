import * as fs from "fs";

export function readdir(
  path: string | Buffer | URL,
  options?: fs.ObjectEncodingOptions
) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, options, (err, files) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(files);
    });
  });
}

export function stat(path: string | Buffer | URL) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stat) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(stat);
    });
  });
}
