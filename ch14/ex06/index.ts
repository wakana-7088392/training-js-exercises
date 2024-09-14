type proxylog = {
  callTime: Date;
  methodName: string;
  args: any[];
};

export function addProxyLog<T extends object>(o: T) {
  const log: proxylog[] = [];

  const handlers: ProxyHandler<T> = {
    get(target, prop, receiver) {
      const originMethod = Reflect.get(target, prop, receiver);
      if (typeof originMethod === "function") {
        return function (this: any, ...args: any[]) {
          const res = originMethod.apply(this, args);
          log.push({
            callTime: new Date(),
            methodName: prop as string,
            args: args,
          });
          return res;
        };
      }
      return originMethod;
    },
  };

  const proxy = new Proxy(o, handlers);
  return { proxy, log };
}
