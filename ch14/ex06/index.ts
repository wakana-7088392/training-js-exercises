type proxylog = {
  callTime: Date;
  methodName: string;
  args: any[];
};

export function addProxyLog<T extends object>(o: T) {
  const log: proxylog[] = [];

  const handlers: ProxyHandler<T> = {
    get(target, prop, receiver) {
      // 元オブジェクトのプロパティを取得
      const originMethod = Reflect.get(target, prop, receiver);
      if (typeof originMethod === "function") {
        return function (this: any, ...args: any[]) {
          // 元の関数を呼び出して結果を格納する(あとで返す)
          const res = originMethod.apply(this, args);
          // ログに追加
          log.push({
            callTime: new Date(),
            methodName: prop as string,
            args: args,
          });
          return res;
        };
      }
      // 関数でない場合はそのまま返す
      return originMethod;
    },
  };

  const proxy = new Proxy(o, handlers);
  return { proxy, log };
}

// new Proxyを使って返却するパターンもある。
