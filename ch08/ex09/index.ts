export function withResource(resource, callback) {
  try {
    callback(resource);
  } finally {
    resource.close();
  }
} // 終了時に resource.close が自動で呼ばれる
