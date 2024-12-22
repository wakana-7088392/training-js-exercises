export class TypedMap {
  map;
  keyType: string;
  valueType: string;
  constructor(keytype: string, valueType: string, entries: any) {
    this.map = new Map();
    let k;
    let v;
    if (entries) {
      for ([k, v] of entries) {
        if (typeof k !== keytype || typeof v !== valueType) {
          throw new TypeError(`Wrong type for entry [${k}, ${v}]`);
        }
        this.map.set(k, v);
      }
    }
    this.keyType = keytype;
    this.valueType = valueType;
  }

  set(key: any, value: any) {
    if (this.keyType && typeof key !== this.keyType) {
      throw new TypeError(`${key} is not of type ${this.keyType}`);
    }
    if (this.valueType && typeof value !== this.valueType) {
      throw new TypeError(`${value} is not of type ${this.valueType}`);
    }
    return this.map.set(key, value);
  }
}
