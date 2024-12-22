import { TypedMap } from "./index.ts";

describe("ch09/ex06/index.ts", () => {
  let typedMap = new TypedMap("number", "string", [[1, "1"]]);
  describe("constructor", () => {
    let m = new Map([[1, "map1"]]);
    let typedMapM = new TypedMap("number", "string", m);
    test("Array", () => {
      expect(typedMap.map.get(1)).toBe("1");
      expect(() => new TypedMap("string", "string", [[1, "1"]])).toThrow(
        TypeError
      );
      expect(() => new TypedMap("string", "string", [[1, "1"]])).toThrow(
        "Wrong type for entry [1, 1]"
      );
      expect(() => new TypedMap("number", "number", [[1, "1"]])).toThrow(
        TypeError
      );
      expect(() => new TypedMap("number", "number", [[1, "1"]])).toThrow(
        "Wrong type for entry [1, 1]"
      );
    });
    test("Map", () => {
      expect(typedMapM.map.get(1)).toBe("map1");
      expect(() => new TypedMap("string", "string", m)).toThrow(TypeError);
      expect(() => new TypedMap("string", "string", m)).toThrow(
        "Wrong type for entry [1, map1]"
      );
      expect(() => new TypedMap("number", "number", m)).toThrow(TypeError);
      expect(() => new TypedMap("number", "number", m)).toThrow(
        "Wrong type for entry [1, map1]"
      );
    });
  });

  test("set", () => {
    expect(typedMap.set(2, "2").get(2)).toBe("2");
    expect(() => typedMap.set("1", "1")).toThrow(TypeError);
    expect(() => typedMap.set("1", "1")).toThrow("1 is not of type number");
    expect(() => typedMap.set(1, 1)).toThrow(TypeError);
    expect(() => typedMap.set(1, 1)).toThrow("1 is not of type string");
  });
});
