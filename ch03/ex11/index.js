let symbol1 = Symbol("prop");
let symbol2 = Symbol("prop");

let obj1 = {};
obj1[symbol1] = 1;
obj1[symbol2] = 2;
console.log(obj1[symbol1]);
console.log(obj1[symbol2]);

let symbol3 = Symbol.for("forprop");
let symbol4 = Symbol.for("forprop");

let obj2 = {};
obj2[symbol3] = 3;
obj2[symbol4] = 4;
console.log(obj2[symbol3]);
console.log(obj2[symbol4]);
