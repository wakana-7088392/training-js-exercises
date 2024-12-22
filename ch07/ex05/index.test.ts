import { pop, push, shift, unshift, sort } from "./index.ts";

const seqN = [1, 2, 3, 4, 5];
const seqS = ["a", "b", "c", "d", "e"];
const seqO = [
  {
    id: 1,
    name: "name1",
  },
  {
    id: 2,
    name: "name2",
  },
  {
    id: 3,
    name: "name3",
  },
];
describe("ch07/ex05", () => {
  describe("pop", () => {
    test("number", () => {
      expect(pop(seqN)).toEqual([1, 2, 3, 4]);
    });
    test("string", () => {
      expect(pop(seqS)).toEqual(["a", "b", "c", "d"]);
    });
    test("object", () => {
      expect(pop(seqO)).toEqual([
        {
          id: 1,
          name: "name1",
        },
        {
          id: 2,
          name: "name2",
        },
      ]);
    });
  });
  describe("push", () => {
    test("number", () => {
      expect(push(seqN, 6)).toEqual([1, 2, 3, 4, 5, 6]);
    });
    test("string", () => {
      expect(push(seqS, "f")).toEqual(["a", "b", "c", "d", "e", "f"]);
    });
    test("object", () => {
      expect(push(seqO, { id: 4, name: "name4" })).toEqual([
        {
          id: 1,
          name: "name1",
        },
        {
          id: 2,
          name: "name2",
        },
        {
          id: 3,
          name: "name3",
        },
        {
          id: 4,
          name: "name4",
        },
      ]);
    });
  });
  describe("shift", () => {
    test("number", () => {
      expect(shift(seqN)).toEqual([2, 3, 4, 5]);
    });
    test("string", () => {
      expect(shift(seqS)).toEqual(["b", "c", "d", "e"]);
    });
    test("object", () => {
      expect(shift(seqO)).toEqual([
        {
          id: 2,
          name: "name2",
        },
        {
          id: 3,
          name: "name3",
        },
      ]);
    });
  });
  describe("unshift", () => {
    test("number", () => {
      expect(unshift(seqN, 0)).toEqual([0, 1, 2, 3, 4, 5]);
    });
    test("string", () => {
      expect(unshift(seqS, "z")).toEqual(["z", "a", "b", "c", "d", "e"]);
    });
    test("object", () => {
      expect(unshift(seqO, { id: 0, name: "name0" })).toEqual([
        {
          id: 0,
          name: "name0",
        },
        {
          id: 1,
          name: "name1",
        },
        {
          id: 2,
          name: "name2",
        },
        {
          id: 3,
          name: "name3",
        },
      ]);
    });
  });
  describe("sort", () => {
    test("number", () => {
      expect(sort(seqN, (a, b) => b - a)).toEqual([5, 4, 3, 2, 1]);
    });
  });
});
