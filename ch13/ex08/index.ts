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
  // for文でファイルのサイズを一つずつ合算していく
  for (const file of files) {
    const stats = await stat(join(path, file));
    total += stats.size;
  }
  return total;
}
