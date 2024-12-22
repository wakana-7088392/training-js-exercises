import { instanceOf } from "./index.ts";

describe("ch09/ex05", () => {
  describe("test", () => {
    class Animal {
      eat() {
        console.log("eat");
      }
    }
    class Dog extends Animal {
      bite() {
        console.log("Dog bite");
      }
    }
    class Husky extends Dog {
      bite() {
        console.log("Husky bite");
      }
    }
    class Car {
      drive() {
        console.log("drive");
      }
    }
    const animal = new Animal();
    const dog = new Dog();
    const husky = new Husky();
    const car = new Car();
    test("instanceofの場合", () => {
      // 同じオブジェクトを入力するケース
      expect(animal instanceof Animal).toBe(true);
      expect(dog instanceof Dog).toBe(true);
      // 継承したクラスのインスタンスと基底クラスのコンストラクタを入力するケース
      expect(dog instanceof Animal).toBe(true);
      // 「多段に継承したクラスのインスタンスと基底クラスのコンストラクタを入力するケース」
      expect(husky instanceof Animal).toBe(true);
      // 「継承関係にないインスタンスとクラスのコンストラクタを入力するケース」
      expect(car instanceof Animal).toBe(false);
    });
    test("同じオブジェクトを入力するケース", () => {
      expect(instanceOf(animal, Animal)).toBe(true);
      expect(instanceOf(dog, Dog)).toBe(true);
    });
    test("継承したクラスのインスタンスと基底クラスのコンストラクタを入力するケース", () => {
      expect(instanceOf(dog, Animal)).toBe(true);
    });
    test("「多段に継承したクラスのインスタンスと基底クラスのコンストラクタを入力するケース」", () => {
      expect(instanceOf(husky, Animal)).toBe(true);
    });
    test("「継承関係にないインスタンスとクラスのコンストラクタを入力するケース」", () => {
      expect(instanceOf(car, Dog)).toBe(false);
    });
  });
});
