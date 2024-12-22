class Example {
  valueOf() {
    return 1;
  }
  toString() {
    return "test";
  }
}

let obj = new Example();
console.log(Number(obj));
console.log(String(obj));
