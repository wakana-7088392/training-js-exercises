import { Point } from ".";

describe("Point", () => {
  test("Pointのxとyに値が入ると、反映される", () => {
    let p = new Point(1, 2);
    expect(p.x).toBe(1);
    expect(p.y).toBe(2);
  });

  test("xとyに値がある時、加算される", () => {
    let p = new Point(1, 1);
    p.add(3, 2);
    expect(p.x).toBe(4);
    expect(p.y).toBe(3);
  });
});
