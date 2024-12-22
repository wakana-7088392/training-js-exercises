import { obj } from "./index.ts";
test("NaNなし", () => {
  obj.x = 3;
  obj.y = 4;
  expect(obj.r).toBe(5);
  expect(obj.theta).toBe(53.1301024);
});
test("NaNあり", () => {
  expect(() => (obj.x = NaN)).toThrow(Error);
  expect(() => (obj.y = NaN)).toThrow(Error);
});
