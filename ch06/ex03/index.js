let o = {};
o.x = 1;
let p = Object.create(o);
p.y = 2;
let q = Object.create(p);
q.z = 3;
let f = q.toString();
console.log(q.x + q.y);

// ↑までがp.149の内容

console.log("oとp=" + o.isPrototypeOf(p));
console.log("oとq~" + o.isPrototypeOf(q));
console.log("oとq=" + p.isPrototypeOf(q));
console.log("pとo=" + p.isPrototypeOf(o));

//総当たりしてみる
let a = new Array();
let d = new Date();
let m = new Map();

const checkPrototype = (obj) => {
  console.log(`Objectと${obj}=` + Object.prototype.isPrototypeOf(obj));
  console.log(`Arrayと${obj}=` + Array.prototype.isPrototypeOf(obj));
  console.log(`Dateと${obj}₌` + Date.prototype.isPrototypeOf(obj));
  console.log(`Mapと${obj}=` + Map.prototype.isPrototypeOf(obj));
  console.log(`Numberと${obj}=` + Number.prototype.isPrototypeOf(obj) + "\n");
};

checkPrototype(o); // Objectはtrue
checkPrototype(a); // Object,Arrayはtrue
checkPrototype(d); // Object,dateはtrue
checkPrototype(m); // Object,Mapはtrue
