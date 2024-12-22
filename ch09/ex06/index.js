// 元のコード挙動確認用
export class TypedMap extends Map {
  keyType;
  valueType;
  constructor(keytype, valueType, entries) {
    if (entries) {
      for (let [k, v] of entries) {
        if (typeof k !== keytype || typeof v !== valueType) {
          throw new TypeError(`Wrong type for entry [${k}, ${v}]`);
        }
      }
    }
    super(entries);
    this.keyType = keytype;
    this.valueType = valueType;
  }

  set(key, value) {
    if (this.keyType && typeof key !== this.keyType) {
      throw new TypeError(`${key} is not of type ${this.keyType}`);
    }
    if (this.valueType && typeof value !== this.valueType) {
      throw new TypeError(`${value} is not of type ${this.valueType}`);
    }
    return super.set(key, value);
  }
}

let typedMap1 = new TypedMap("number", "string", [[1, "OK1"]]);
// let typedMap2 = new TypedMap("number", "string", [[1, 1]]);
console.log(typedMap1.get(1));
typedMap1.set(2, "OK2");
// typedMap1.set("NG", "NG");
console.log(typedMap1.get(2));
