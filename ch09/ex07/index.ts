class Animal {
  eat() {
    console.log("eat");
  }
  makeSound() {
    console.log("makeSound");
  }
}

class Dog {
  animal;
  constructor() {
    this.animal = new Animal();
  }
  bite() {
    console.log("bite");
  }
  makeSound() {
    this.animal.makeSound();
  }
}

class Husky extends Dog {
  makeSound() {
    console.log("Husky makeSound");
  }
}

class Cat {
  animal;
  constructor() {
    this.animal = new Animal();
  }
  scratch() {
    console.log("scratch");
  }
  makeSound() {
    this.animal.makeSound();
  }
}

class Bird {
  animal;
  constructor() {
    this.animal = new Animal();
  }
  fly() {
    console.log("fly");
  }
  makeSound() {
    this.animal.makeSound();
  }
}

class Fish {
  animal;
  constructor() {
    this.animal = new Animal();
  }
  swim() {
    console.log("swim");
  }
}

const dog = new Dog();
const husky = new Husky();
const cat = new Cat();
const bird = new Bird();
const fish = new Fish();
console.log("dog");
dog.makeSound();
console.log("husky");
husky.makeSound();
console.log("cat");
cat.makeSound();
console.log("bird");
bird.makeSound();
// fish.makeSound(); =>'makeSound' は型 'Fish' に存在しません。
