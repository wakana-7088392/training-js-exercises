class C {
  private x = 42;

  getX() {
    return this.x;
  }
}

class A {
  getX() {
    const x = 42;
    return function () {
      return x;
    };
  }
}

class B {
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
