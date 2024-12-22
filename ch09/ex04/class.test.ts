import { Warrior, MagicWarrior } from "./class.ts";

describe("ch09/ex04/index.ts", () => {
  let w = new Warrior(100);
  let mw = new MagicWarrior(100, 80);
  test("Warrior", () => {
    expect(w instanceof Warrior).toBe(true);
    expect(w.attack()).toBe(200);
  });
  test("MagicWarrior", () => {
    expect(mw instanceof MagicWarrior).toBe(true);
    expect(mw instanceof Warrior).toBe(true);
    expect(mw.attack()).toBe(280);
  });
});
