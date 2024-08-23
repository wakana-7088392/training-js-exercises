import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

export async function fetchFirstFileSize(path: string) {
  try {
    // fs/primisesのreaddirを使用
    const files = await readdir(path);
    // filesの流さが0の場合はnullを返却
    if (files.length === 0) {
      return null;
    }
    const stats = await stat(join(path, files[0]));
    return stats.size;
  } catch (err) {
    // errはここでキャッチしてthrowする
    throw err;
  }
}

export async function fetchSumOfFileSizes(path: string) {
  try {
    const files = await readdir(path);
    let total = 0;
    // for文でfileの数だけsizeを加算する
    for (const file of files) {
      const stats = await stat(join(path, file));
      total += stats.size;
    }
    return total;
  } catch (err) {
    // errはここでキャッチしてthrowする
    throw err;
  }
}
