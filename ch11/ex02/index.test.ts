import { cache } from "./index.ts";

describe("ch11/ex02", () => {
  beforeEach(() => jest.restoreAllMocks());
  test("2回目同じ引数でslowFnを呼んだ際、cacheが機能するか", () => {
    const mockFn = jest.fn().mockImplementation((x) => JSON.stringify(x));
    const cachedFn = cache(mockFn);
    let obj: any = { name: "Hanako" };
    expect(cachedFn(obj)).toBe('{"name":"Hanako"}');
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(cachedFn(obj)).toBe('{"name":"Hanako"}');
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
  //うまく出来ず…。
  //   test("slowFnの引数のオブジェクトが到達不能になった場合には、ガベージコレクションの対象になっているか", () => {
  //     const mockFn = jest.fn().mockImplementation((x) => JSON.stringify(x));
  //     const cachedFn = cache(mockFn);
  //     let obj: any = { name: "Hanako" };
  //     expect(cachedFn(obj)).toBe('{"name":"Hanako"}');
  //     expect(mockFn).toHaveBeenCalledTimes(1);
  //     if (global.gc) {
  //       global.gc();
  //     }
  //     expect(cachedFn(obj)).toBe('{"name":"Hanako"}');
  //     expect(mockFn).toHaveBeenCalledTimes(2);
  //   });
});

// メモリリークをわざと起こして強制的にGCを起こせば良さそう
