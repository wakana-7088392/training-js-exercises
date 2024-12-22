import { getArray, changeBigToLittle, changeLittleToBig } from "./index.ts";

describe("ch11/ex03", () => {
  const arr = new Uint32Array([
    100, 200, 400, 1600, 50000, 100000, 125000, 150000, 2000000, 10000000,
  ]);
  const checkArr = new Array();
  checkArr.push(
    100,
    200,
    400,
    1600,
    50000,
    100000,
    125000,
    150000,
    2000000,
    10000000
  );
  test("little to big", () => {
    const res = changeLittleToBig(arr);
    expect(getArray(res, false)).toEqual(checkArr);
  });
  test("big to little", () => {
    const big = changeLittleToBig(arr);
    const res = changeBigToLittle(big);
    expect(getArray(res, true)).toEqual(checkArr);
  });
});
