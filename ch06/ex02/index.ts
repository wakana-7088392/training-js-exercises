let obj = { x: 1, y: 2 };
let obj1 = Object.create(obj);

console.log(Object.getPrototypeOf(obj1)); // { x: 1, y: 2 }
