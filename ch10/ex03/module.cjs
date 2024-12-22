// 関数のエクスポート
exports.greet = function (name) {
  return `Hello, ${name}!`;
};
// クラスのエクスポート
exports.Human = class {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  introduce() {
    return `I'm ${this.name} and I'm ${this.age} years old.`;
  }
};
