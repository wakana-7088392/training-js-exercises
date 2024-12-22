export class MyArrayLike<T> {
  private items: T[];
  constructor(items: T[]) {
    this.items = items;
  }

  get length() {
    return this.items.length;
  }

  // 反復処理できるようにする。
  [Symbol.iterator]() {
    let index = 0;
    const items = this.items;
    return {
      next() {
        if (index < items.length) {
          return { value: items[index++], done: false };
        } else {
          return { value: undefined, done: true };
        }
      },
    };
  }
}

export class MyArray<T> extends Array<T> {
  constructor(items: any) {
    super(...items);
  }
  // Arrayクラスを返すことで、mapやsliceなどのメソッドがMyArrayではなくArrayインスタンスを返す
  static get [Symbol.species]() {
    return Array;
  }
  // これにより、以降のメソッドでMyArrayLikeにラップして返すことができる
  map<U>(callback: (value: T, index: number, array: T[]) => U): any {
    const result = super.map(callback);
    return new MyArrayLike(result);
  }

  slice(start?: number, end?: number): any {
    const resArray = super.slice(start, end);
    const result = Array.from(resArray);
    return new MyArrayLike(result);
  }
}
