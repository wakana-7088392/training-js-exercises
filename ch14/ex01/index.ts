export const nestedUnwritableObj = () => {
  // ネストされたオブジェクトの生成
  const obj: any = { c: { d: { e: 3 } } };
  // 各ネストごとにfreeze(凍結)する。深いネストからfreezeすることで全てが変更不可になるようにする。
  Object.freeze(obj.c.d);
  Object.freeze(obj.c);
  Object.freeze(obj);
  return obj;
};
export const unwritableAndUnconfigurableObj = () => {
  const obj: any = { a: 1 };
  // 書き込み不可、再定義不可に設定する。
  Object.defineProperty(obj, "a", {
    writable: false,
    configurable: false,
  });
  return obj;
};
export const writableAndUnconfigurableObj = () => {
  const obj: any = { b: 2 };
  // 書き込み可、再定義不可に設定する。
  Object.defineProperty(obj, "b", {
    writable: true,
    configurable: false,
  });
  return obj;
};

// sealを使うと簡潔に作成できる。
