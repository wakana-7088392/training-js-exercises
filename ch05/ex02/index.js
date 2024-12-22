"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceSwitch = exports.replaceIfElse = void 0;
var s = '1\0a2\b3\t4\n5\v6\f7\r8"\\';
var replaceIfElse = function (s) {
    var res = "";
    for (var _i = 0, s_1 = s; _i < s_1.length; _i++) {
        var moji = s_1[_i];
        if (moji === "\0") {
            res += "\\0";
        }
        else if (moji === "\b") {
            res += "\\b";
        }
        else if (moji === "\t") {
            res += "\\t";
        }
        else if (moji === "\n") {
            res += "\\n";
        }
        else if (moji === "\v") {
            res += "\\v";
        }
        else if (moji === "\f") {
            res += "\\f";
        }
        else if (moji === "\r") {
            res += "\\r";
        }
        else if (moji === '"') {
            res += '\\"';
        }
        else if (moji === "\\") {
            res += "\\\\";
        }
        else {
            res += moji;
        }
    }
    return res;
};
exports.replaceIfElse = replaceIfElse;
var replaceSwitch = function (s) {
    var res = "";
    for (var _i = 0, s_2 = s; _i < s_2.length; _i++) {
        var moji = s_2[_i];
        switch (moji) {
            case "\0":
                res += "\\0";
                break;
            case "\b":
                res += "\\b";
                break;
            case "\t":
                res += "\\t";
                break;
            case "\n":
                res += "\\n";
                break;
            case "\v":
                res += "\\v";
                break;
            case "\f":
                res += "\\f";
                break;
            case "\r":
                res += "\\r";
                break;
            case '"':
                res += '\\"';
                break;
            case "\\":
                res += "\\\\";
                break;
            default:
                res += moji;
        }
    }
    return res;
};
exports.replaceSwitch = replaceSwitch;
console.log((0, exports.replaceIfElse)(s));
console.log((0, exports.replaceSwitch)(s));
