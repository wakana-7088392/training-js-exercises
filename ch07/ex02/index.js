var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// もとのコード①
function fizzbuzz(n) {
    for (var i = 1; i <= n; i++) {
        if (i % 15 === 0) {
            console.log("FizzBuzz");
        }
        else if (i % 3 === 0) {
            console.log("Fizz");
        }
        else if (i % 5 === 0) {
            console.log("Buzz");
        }
        else {
            console.log(i);
        }
    }
}
function reFizzbuzz(n) {
    var num = __spreadArray([], new Array(n), true);
    num = num.map(function (v, i) {
        return { number: i + 1, result: i + 1 };
    });
    var num15 = num
        .filter(function (x) { return x.result % 15 === 0; })
        .map(function (v) {
        return { number: v.number, result: "FizzBuzz" };
    });
    var num3 = num
        .filter(function (x) { return x.result % 15 !== 0 && x.result % 3 === 0; })
        .map(function (v) {
        return { number: v.number, result: "Fizz" };
    });
    var num5 = num
        .filter(function (x) { return x.result % 15 !== 0 && x.result % 5 === 0; })
        .map(function (v) {
        return { number: v.number, result: "Buzz" };
    });
    var numOther = num.filter(function (x) { return x.result % 3 !== 0 && x.result % 5 !== 0; });
    var array = new Array();
    array = array
        .concat(num15, num3, num5, numOther)
        .sort(function (a, b) { return a.number - b.number; });
    array.forEach(function (v) {
        console.log(v.result);
    });
}
reFizzbuzz(20);
// もとのコード②
function sumOfSquaredDifference(f, g) {
    var result = 0;
    for (var i = 0; i < f.length; i++) {
        result += Math.pow((f[i] - g[i]), 2);
    }
    return result;
}
function reSumOfSquaredDifference(f, g) {
    var result = 0;
    f.forEach(function (v, i) {
        result += Math.pow((v - g[i]), 2);
    });
    return result;
}
var f = [20, 50, 40, 30, 10, 80];
var g = [10, 20, 30, 40, 50, 60];
console.log("sumOfSquaredDifference = ".concat(reSumOfSquaredDifference(f, g)));
console.log("reSumOfSquaredDifference = ".concat(reSumOfSquaredDifference(f, g)));
// もとのコード③
function sumOfEvensIsLargerThan42(array) {
    var sum = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i] % 2 !== 0) {
            continue;
        }
        sum += array[i];
        if (sum >= 42) {
            return true;
        }
    }
    return false;
}
function reSumOfEvensIsLargerThan42(array) {
    var result = array.filter(function (x) { return x % 2 === 0; }).reduce(function (x, y) { return x + y; }) >= 42;
    return result;
}
var array = [20, 21, 22, 23, 24];
console.log("sumOfEvensIsLargerThan42 = ".concat(sumOfEvensIsLargerThan42(array)));
console.log("reSumOfEvensIsLargerThan42 = ".concat(reSumOfEvensIsLargerThan42(array)));
