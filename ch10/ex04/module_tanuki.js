// デフォルトの関数のエクスポート
export default function greetTanuki(name) {
  return `Hello, ${name}!`;
}

export function eat() {
  return "eat";
}

export class Tanuki {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  introduce() {
    return `I'm ${this.name} and I'm ${this.age} years old.`;
  }
}
