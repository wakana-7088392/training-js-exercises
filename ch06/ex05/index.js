var protoO = { x: "proto", 1: "proto", z: "proto" };
Object.defineProperty(protoO, "u", {
    value: "proto:列挙可",
    enumerable: true,
});
var o = Object.create(protoO);
o["x"] = "o";
o[1] = "o";
o["y"] = "o";
o[2] = "o";
Object.defineProperty(o, "u", {
    value: "o:列挙不可",
    enumerable: false,
});
for (var property in o) {
    console.log("".concat(property, ": ").concat(o[property]));
}
