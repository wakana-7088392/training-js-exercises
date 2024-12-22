var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var seq = [1, 2, 3, 4, 5];
var pop = function (seq) {
    var resultArray = seq.filter(function (v, i, a) { return i !== a.length - 1; });
    return resultArray;
};
var push = function (seq, value) {
    var resultArray = __spreadArray(__spreadArray([], seq, true), [value], false);
    return resultArray;
};
var shift = function (seq) {
    var resultArray = seq.slice(1, seq.length);
    return resultArray;
};
var unshift = function (seq, value) {
    var resultArray = __spreadArray([value], seq, true);
    return resultArray;
};
var sort = function (seq, a) {
    var copy = __spreadArray([], seq, true);
    var resultArray = copy.sort(a);
    return resultArray;
};
console.log(pop(seq)); // [1, 2, 3, 4]
console.log(push(seq, 6)); // [1, 2, 3, 4, 5, 6]
console.log(shift(seq)); // [2, 3, 4, 5]
console.log(unshift(seq, 0)); // [0, 1, 2, 3, 4, 5]
console.log(sort(seq, function (a, b) { return b - a; })); // [5, 4, 3, 2, 1]
// 元の配列は変更されていない
console.log(seq); // [1, 2, 3, 4, 5]
