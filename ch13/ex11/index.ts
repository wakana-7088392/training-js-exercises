// 以下のコード(ch11/ex16で作成した関数)をPromise を返すように変更させる
/**
 * 引数の func は Promise を返す関数とし、
 * func の返り値が成功した場合は retryWithExponentialBackoff の返り値をその値で解決しなさい。
 * また func の返り値が失敗した場合は一定時間後にリトライしなさい。
 * 一定回数以上 func が失敗した場合は retryWithExponentialBackoff の返り値を失敗させなさい。
 */

export async function retryWithExponentialBackoff<T>(
  func: () => Promise<T>,
  maxRetry: number
): Promise<T> {
  return new Promise((resolve, reject) => {
    const internal = (retryCount: number) => {
      func()
        .then(resolve)
        .catch((error) => {
          if (retryCount < maxRetry) {
            const interval = 2 ** retryCount * 10;
            setTimeout(() => internal(retryCount + 1), interval);
          } else {
            reject(error);
          }
        });
    };
    internal(0);
  });
}

// const resp = await retryWithExponentialBackoff(
//   () => fetch("https://example.com"),
//   5
// );

// console.log(resp);

// export function retryWithExponentialBackoff(
//   func: () => boolean,
//   maxRetry: number,
//   callback: (b: boolean) => void
// ) {
//   const internal = (retryCount: number) => {
//     if (func()) {
//       callback(true);
//     } else {
//       // maxRetryより少ないうちは待ち時間を増やしたうえでリトライする
//       // 過度に負荷がかからないようにこのように待ち時間を増やす仕様にすることもあるらしい
//       if (retryCount < maxRetry) {
//         const interval = 2 ** retryCount * 10;
//         setTimeout(() => internal(retryCount + 1), interval);
//       } else {
//         // maxRetryと同じ値になってもtrueにならない場合はfalseを引数としてcallbackを呼ぶ
//         callback(false);
//       }
//     }
//   };
//   setTimeout(() => internal(0));
// }
