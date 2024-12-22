var obj = {
  name: "value1",
  age: 80,
  from: "Tokyo",
};

console.log(`${obj.name} ${obj.age} ${obj.from}`);
console.log(`name hasOwnProperty = ${obj.hasOwnProperty("name")}`);
console.log(`age hasOwnProperty = ${obj.hasOwnProperty("age")}`);
console.log(`from hasOwnProperty = ${obj.hasOwnProperty("from")}`);
console.log(`name propertyIsEnumerable = ${obj.propertyIsEnumerable("name")}`);
console.log(`age propertyIsEnumerable = ${obj.propertyIsEnumerable("age")}`);
console.log(
  `from propertyIsEnumerable = ${obj.propertyIsEnumerable("from")}\n`
);

obj.name = "yamada";
obj.age = 50;
obj.from = "Kyoto";

console.log(`${obj.name} ${obj.age} ${obj.from}`);
console.log(`name hasOwnProperty = ${obj.hasOwnProperty("name")}`);
console.log(`age hasOwnProperty = ${obj.hasOwnProperty("age")}`);
console.log(`from hasOwnProperty = ${obj.hasOwnProperty("from")}`);
console.log(`name propertyIsEnumerable = ${obj.propertyIsEnumerable("name")}`);
console.log(`age propertyIsEnumerable = ${obj.propertyIsEnumerable("age")}`);
console.log(
  `from propertyIsEnumerable = ${obj.propertyIsEnumerable("from")}\n`
);

console.log(`${obj.name} ${obj.age} ${obj.from}`);
console.log(`name hasOwnProperty = ${obj.hasOwnProperty("name")}`);
console.log(`age hasOwnProperty = ${obj.hasOwnProperty("age")}`);
console.log(`from hasOwnProperty = ${obj.hasOwnProperty("from")}`);
console.log(`name propertyIsEnumerable = ${obj.propertyIsEnumerable("name")}`);
console.log(`age propertyIsEnumerable = ${obj.propertyIsEnumerable("age")}`);
console.log(
  `from propertyIsEnumerable = ${obj.propertyIsEnumerable("from")}\n`
);

Object.defineProperty(obj, "age", {
  writable: false,
  enumerable: false,
  configurable: false,
});

console.log(`${obj.name} ${obj.age} ${obj.from}`);
console.log(`name hasOwnProperty = ${obj.hasOwnProperty("name")}`);
console.log(`age hasOwnProperty = ${obj.hasOwnProperty("age")}`);
console.log(`from hasOwnProperty = ${obj.hasOwnProperty("from")}`);
console.log(`name propertyIsEnumerable = ${obj.propertyIsEnumerable("name")}`);
console.log(`age propertyIsEnumerable =${obj.propertyIsEnumerable("age")}`);
console.log(`from propertyIsEnumerable =${obj.propertyIsEnumerable("from")}\n`);

obj.name = "tanaka";
console.log(`${obj.name} ${obj.age} ${obj.from}`);

obj.age = 99;
console.log(`${obj.name} ${obj.age} ${obj.from}`);
