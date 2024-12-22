export const sequexceToObject = (...values) => {
  if (values.length % 2 !== 0) throw new Error();
  let obj = new Object();
  let key = new Array();
  let value = new Array();
  values.forEach((v, i) => {
    if (i % 2 === 0) {
      if (typeof v !== "string") throw new Error();
      key.push(v);
    } else {
      value.push(v);
    }
  });
  for (let i = 0; i < key.length; i++) {
    obj[key[i]] = value[i];
  }
  return obj;
};

console.log(sequexceToObject("a", "1", "b", "2"));
let arr = ["a", "1", "b", "2"];
console.log(sequexceToObject(...arr));
