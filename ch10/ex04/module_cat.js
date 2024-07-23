export default function greet(name) {
  return `Hello, ${name}!`;
}

export class Cat {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  introduce() {
    return `I'm ${this.name} and I'm ${this.age} years old.`;
  }
}
