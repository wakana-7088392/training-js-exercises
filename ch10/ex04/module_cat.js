// デフォルトの関数のエクスポート
export default function greet(name) {
  return `Hello, ${name}!`;
}

// 通常の関数のエクスポート
export class Cat {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  introduce() {
    return `I'm ${this.name} and I'm ${this.age} years old.`;
  }
}
