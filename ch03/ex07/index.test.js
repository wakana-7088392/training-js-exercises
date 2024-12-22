import { equalArrays } from ".";
test("fail", () => {
  expect(equalArrays(1, 500)).toBe(false);
});

test("success", () => {
  expect(equalArrays(["a", "b", "c"], ["a", "b", "c"])).toBe(true);
});

//lengthがない型がくると、.lengthの時にundefinedが返ってしまう。
