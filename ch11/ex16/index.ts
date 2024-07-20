export function retryWithExponentialBackoff(
  func: () => boolean,
  maxRetry: number,
  callback: (b: boolean) => void
) {
  const internal = (retryCount: number) => {
    if (func()) {
      callback(true);
    } else {
      if (retryCount < maxRetry) {
        const interval = 2 ** retryCount * 10;
        setTimeout(() => internal(retryCount + 1), interval);
      } else {
        callback(false);
      }
    }
  };
  setTimeout(() => internal(0));
}
