export class C {
  static C = class {
    static method() {
      return 3;
    }
    method() {
      return 4;
    }
  };
  static method() {
    return 1;
  }
  method() {
    return 2;
  }
  C = class {
    static method() {
      return 5;
    }
    method() {
      return 6;
    }
  };
}
