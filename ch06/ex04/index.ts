let obj = {
  name: "value1",
  age: 80,
};

obj.name = "yamada";
obj.age = 50;

Object.defineProperty(obj, "age", {
  writable: false,
  enumerable: false,
  configurable: false,
});
