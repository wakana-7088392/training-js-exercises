"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bitCount = void 0;
var bitCount = function (num) {
    console.log(num);
    var count = 0;
    for (var i = 1; i <= 32; i++) {
        var bit = 1;
        count += num & bit;
        num = num >> 1;
    }
    return count;
};
exports.bitCount = bitCount;
console.log((0, exports.bitCount)(7));
