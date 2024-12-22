export class Foo {}

export class TypeMap<K extends new (...args: any[]) => any, V> {
  map;
  constructor() {
    this.map = new Map();
  }
  set(key: K, value: V) {
    // プリミティブ型かの判定をする
    if (typeof value !== "object") {
      // プリミティブ型であればtypeofでkeyとvalueの関係性が妥当かを判断する。
      if (key.name.toLowerCase() !== typeof value) {
        throw new Error("value error");
      }
      // それ以外はinstanceofで妥当かを判断する。
    } else if (!(value instanceof key)) {
      throw new Error("value error");
    }
    this.map.set(key, value);
  }
  get(key: K) {
    return this.map.get(key);
  }
}

const typeMap = new TypeMap();
typeMap.set(String, "string");
typeMap.set(Number, 123);
typeMap.set(Foo, new Foo());
// typeMap.set(Date, "not a date"); // -> Error

console.log(typeMap.get(String)); // -> "string"
console.log(typeMap.get(Number)); // -> 123

// prototypeを使って実装する方法もある
