exports.greet = function (name) {
  return `Hello, ${name}!`;
};

exports.Human = class {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  introduce() {
    return `I'm ${this.name} and I'm ${this.age} years old.`;
  }
};
