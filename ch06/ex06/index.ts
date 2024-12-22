let protoSym1 = Symbol("protoPropnameOK");
let protoSym2 = Symbol("protoPropnameNG");
const proto = { x: "protoX", y: "protoY" };
proto[protoSym1] = "protoSym";
Object.defineProperty(proto, protoSym2, {
  value: "列挙不可",
  enumerable: false,
});
Object.defineProperty(proto, "z", {
  value: "proto:列挙不可",
  enumerable: false,
});

let oSym = Symbol("oPropname");
const o = Object.create(proto);
o["a"] = "oA";
o["b"] = "oB";
o[oSym] = "oSym";
Object.defineProperty(o, "c", {
  value: "o:列挙不可",
  enumerable: false,
});

/**
 * 期待結果
 * ・オブジェクトoにある列挙可の独自プロパティa,b,oSymが配列に格納される
 * ・オブジェクトoにある列挙可な継承プロパティであるx,yの少なくとも2つが配列に格納される
 * ・(任意)オブジェクトoにある列挙可な継承プロパティであるprotoSym1が配列に格納される
 */

export const getProperty = (o: Object) => {
  const proto = Object.getPrototypeOf(o);
  let oArray = Reflect.ownKeys(o);
  let protoArray = Object.keys(proto);
  let protoSymArray = Object.getOwnPropertySymbols(proto).filter((x) =>
    proto.propertyIsEnumerable(x)
  );
  return oArray.concat(protoArray, protoSymArray);
};

console.log(getProperty(o));
