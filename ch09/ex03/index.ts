export class C {
  num = 1;
  private x = 42;

  getX() {
    return this.x;
  }
}

export class A {
  getX() {
    const x = 42;
    return function () {
      return x;
    };
  }
}

export class B {
  get getX() {
    const x = 42;
    return function () {
      return x;
    };
  }
}

const x = new C().getX();
const y = new A().getX()();
const z = new B().getX();
