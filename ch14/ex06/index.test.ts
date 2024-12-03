import { addProxyLog } from "./index.ts";

// 複数同じメソッドを呼んだ時に問題なく動作するかを確認するテストがあるといい。
describe("ch14/ex06", () => {
  test("log 1 method", () => {
    const obj = {
      greet(name: string) {
        return `Hello, ${name}!`;
      },
    };

    const { proxy, log } = addProxyLog(obj);

    const result = proxy.greet("World");
    expect(result).toBe("Hello, World!");
    expect(log.length).toBe(1);
    expect(log[0].methodName).toBe("greet");
    expect(log[0].args).toEqual(["World"]);
    expect(log[0].callTime).toBeInstanceOf(Date);
  });
  test("log multi method", () => {
    const obj = {
      add(a: number, b: number) {
        return a + b;
      },
      multi(a: number, b: number) {
        return a * b;
      },
    };

    const { proxy, log } = addProxyLog(obj);

    const addResult = proxy.add(1, 2);
    const multiplyResult = proxy.multi(3, 4);

    expect(addResult).toBe(3);
    expect(multiplyResult).toBe(12);

    expect(log.length).toBe(2);
    expect(log[0].methodName).toBe("add");
    expect(log[0].args).toEqual([1, 2]);
    expect(log[1].methodName).toBe("multi");
    expect(log[1].args).toEqual([3, 4]);
  });

  test("0 method", () => {
    const obj = {
      value: 42,
      getValue() {
        return this.value;
      },
    };

    const { proxy, log } = addProxyLog(obj);
    const value = proxy.value;
    const result = proxy.getValue();
    expect(value).toBe(42);
    expect(result).toBe(42);
    expect(log.length).toBe(1);
    expect(log[0].methodName).toBe("getValue");
    expect(log[0].args).toEqual([]);
  });
});
