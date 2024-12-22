import { Warrior, MagicWarrior } from "./index.ts";

// ImplicitAnyをfalseにすると成功する
describe("ch09/ex04/index.ts", () => {
  let w = new Warrior(100) as any;
  let mw = new MagicWarrior(100, 80) as any;
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
