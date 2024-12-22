import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

export function fetchFirstFileSize(path: string) {
  return readdir(path)
    .then((files) => {
      if (files.length === 0) {
        return null;
      }
      return stat(join(path, files[0])).then((stats) => {
        return stats.size;
      });
    })
    .catch((err) => {
      throw err;
    });
}

export function fetchSumOfFileSizes(path: string) {
  return readdir(path).then((files) =>
    Promise.all(
      // Promise.allで各ファイルごとのサイズを取得するPromiseオブジェクトを管理
      files.map((file) => stat(join(path, file)).then((stats) => stats.size))
      // その後サイズを合算して返す
    ).then((ns) => ns.reduce((p, v) => p + v, 0))
  );
  // .then((files) => {
  //   let total = 0;
  //   const arr = [];
  //   for (const file of files) {
  //     arr.push(
  //       stat(join(path, file)).then((stats) => {
  //         total += stats.size;
  //       })
  //     );
  //   }
  //   return Promise.all(arr).then(() => total);
  // })
}
