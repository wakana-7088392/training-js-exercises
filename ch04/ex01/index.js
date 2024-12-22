var a = { x: 2, y: 3 };
var b = { x: -1, y: 2 };
var add = function (a, b) {
    return { x: a.x + b.x, y: a.y + b.y };
};
var sub = function (a, b) {
    return { x: a.x - b.x, y: a.y - b.y };
};
var mul = function (a, b) {
    var rn = a.x * b.x + a.y * b.y * -1;
    var imgn = a.x * b.y + a.y * b.x;
    return { x: rn, y: imgn };
};
var div = function (a, b) {
    var res1 = mul(a, { x: b.x, y: -b.y });
    var res2 = b.x * b.x - b.y * b.y * -1;
    return { x: res1.x / res2, y: res1.y / res2 };
};
console.log(add(a, b)); // 1 + 5i
console.log(sub(a, b)); // 3 + i
console.log(mul(a, b)); // -8 + i
console.log(div(a, b)); // 0.8 - 1.4i
