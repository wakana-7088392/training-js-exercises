const object = { x: 1, y: 1 };
for (const property in object) {
  console.log(property);
  console.log(object[property]);
}
