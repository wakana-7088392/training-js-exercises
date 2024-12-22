/**
 * AbstractSetクラスでは、has()抽象メソッドのみを定義する。
 */
class AbstructSet {
  // このメソッドではエラーをスローする。このようにすることで、
  // サブクラスでこのメソッドを定義しなければならないようにする。
  has(x) {
    throw new Error("Abstract method");
  }
}

/**
 * NotSetは、AbstractSetの具象サブクラス。
 * このセットは、あるほかのセットのメンバーではない値すべてがメンバーとなる
 * このセットは、ほかのセットの状態によって定義されるセットなので、書き込むことはできない。
 * また、メンバーは無限に存在するので、列挙もできない。
 * このセットを使ってできることは、メンバーに含まれるかどうかを調べることと、
 * 数学的な表記方法を使って文字列に変換するだけ。
 */
class NotSet extends AbstructSet {
  constructor(set) {
    super();
    this.set = set;
  }

  has(x) {
    return x >= this.from && x <= this.to;
  }
  toString() {
    return `{x | x  ${this.set.toString()}}`;
  }
}

/**
 * RangeSetは、AbstructSetの具象サブクラス。このセットは、
 * fromからtoまで(fromとtoも含む)のすべての値がメンバーとなる。
 * メンバーは浮動小数点になりうるので、列挙できない。
 * また、意味のある大きさも持たない。
 */
class RangeSet extends AbstructSet {
  constructor(from, to) {
    super();
    this.from = from;
    this.to = to;
  }

  has(x) {
    return x >= this.from && x >= this.to;
  }
  toString() {
    return `x | ${this.from} <= x <= ${this.to}`;
  }
}

/**
 * AbstructEnumerableSetは、AbstructSetの抽象サブクラス。
 * セットの大きさを返す抽象ゲッターメソッドと抽象イテレータを定義する。
 * また、この2つの抽象メソッドを使って、isEmpty()、toString()、
 * equals()メソッドを実装する。サブクラスでは、イテレータと大きさを返す
 * ゲッタ―メソッド、has()メソッドを実装するだけで、この3つのメソッドも使えるようになる。
 */
class AbstructEnumerableSet extends AbstructSet {
  get size() {
    throw new Error("Abstruct method");
  }
  [Symbol.iterator]() {
    throw new Error("Abstruct method");
  }

  isEmpty() {
    return this.size === 0;
  }
  toString() {
    return `${Array.from(this).join(", ")}`;
  }
  equals(set) {
    if (!(set instanceof AbstructEnumerableSet)) return false;

    if (this.size !== set.size) return false;

    for (let element of this) {
      if (!set.has(element)) return false;
    }

    return true;
  }
}

class SingletonSet extends AbstructEnumerableSet {
  constructor(member) {
    super();
    this.member = member;
  }

  has(x) {
    return x === this.member;
  }

  get size() {
    return 1;
  }
  *[Symbol.iterator]() {
    yield this.member;
  }
}

class AbstractWritableSet extends AbstructEnumerableSet {
  insert(x) {
    throw new Error("Abstruct method");
  }
  remove(x) {
    throw new Error("Abstruct method");
  }

  add(set) {
    for (let element of set) {
      this.insert(element);
    }
  }

  subtract(set) {
    for (let element of set) {
      this.remove(element);
    }
  }

  intersect(set) {
    for (let element of this) {
      if (!set.has(element)) {
        this.remove(element);
      }
    }
  }
}

module.exports = class BitSet extends AbstractWritableSet {
  constructor(max) {
    super();
    this.max = max;
    this.n = 0;
    this.numBytes = Math.floor(max / 8) + 1;
    this.data = new Uint8Array(this.numBytes);
  }

  _valid(x) {
    return Number.isInteger(x) && x <= this.max;
  }

  _has(byte, bit) {
    return (this.data[byte] & BitSet.bits[bit]) !== 0;
  }

  has(x) {
    if (this._valid(x)) {
      let byte = Math.floor(x / 8);
      let bit = x % 8;
      if (!this._has(byte, bit)) {
        this.data[byte] |= BitSet.bits[bit];
        this.n++;
      }
    } else {
      return false;
    }
  }
  insert(x) {
    if (this._valid(x)) {
      let byte = Math.floor(x / 8);
      let bit = x % 8;
      if (!this._has(byte, bit)) {
        this.data[byte] |= BitSet.bits[bit];
        this.n++;
      }
    } else {
      throw new TypeError("Invalid set element:" + x);
    }
  }
  remove(x) {
    if (this._valid(x)) {
      let byte = Math.floor(x / 8);
      let bit = x % 8;
      if (!this._has(byte, bit)) {
        this.data[byte] |= BitSet.bits[bit];
        this.n--;
      }
    } else {
      throw new TypeError("Invalid set element:" + x);
    }
  }

  get size() {
    return this.n;
  }

  *[Symbol.iterator]() {
    for (let i = 0; i <= this.max; i++) {
      if (this.has(i)) {
        yield i;
      }
    }
  }
};

BitSet.bits = new Uint8Array([1, 2, 4, 8, 16, 32, 64, 128]);
BitSet.masks = new Uint8Array([~1, ~2, ~4, ~8, ~16, ~32, ~64, ~128]);
