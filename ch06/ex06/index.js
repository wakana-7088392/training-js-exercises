var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var protoO = { x: "proto", 1: "proto", z: "proto" };
Object.defineProperty(protoO, "u", {
    value: "proto:列挙可",
    enumerable: true,
});
var o = Object.create(protoO);
var p = __assign({}, protoO);
console.log(p);
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
