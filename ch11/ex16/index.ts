export function retryWithExponentialBackoff(
  func: () => boolean,
  maxRetry: number,
  callback: (b: boolean) => void
) {
  const internal = (retryCount: number) => {
    if (func()) {
      callback(true);
    } else {
      // maxRetryより少ないうちは待ち時間を増やしたうえでリトライする
      if (retryCount < maxRetry) {
        const interval = 2 ** retryCount * 10;
        setTimeout(() => internal(retryCount + 1), interval);
      } else {
        // maxRetryと同じ値になってもtrueにならない場合はfalseを引数としてcallbackを呼ぶ
        callback(false);
      }
    }
  };
  setTimeout(() => internal(0));
}
