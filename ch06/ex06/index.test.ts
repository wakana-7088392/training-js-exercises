import { getProperty } from "./index.ts";

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

describe("ch06", () => {
  test("getProperty", () => {
    expect(getProperty(o)).toEqual(["a", "b", "c", oSym, "x", "y", protoSym1]);
  });
});
