import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

export async function fetchFirstFileSize(path: string) {
  // fs/primisesのreaddirを使用
  const files = await readdir(path);
  // filesの流さが0の場合はnullを返却
  if (files.length === 0) {
    return null;
  }
  const stats = await stat(join(path, files[0]));
  return stats.size;
}

export async function fetchSumOfFileSizes(path: string) {
  const files = await readdir(path);
  let total = 0;
  const arr = [];
  // for文でファイルの数分、サイズを取得してtotalに合算する処理を行うPromiseを配列に格納する
  for (const file of files) {
    arr.push(
      stat(join(path, file)).then((stats) => {
        total += stats.size;
      })
    );
  }
  // サイズの合算が完了するまで待機し、完了したら返す
  await Promise.all(arr);
  return total;
}
