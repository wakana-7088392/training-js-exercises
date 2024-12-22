// 戦士：warrior
// 魔法戦士：magic warrior

export function Warrior(this: any, atk: number) {
  this.atk = atk;
}

Warrior.prototype = {
  constructor: Warrior,
  attack: function () {
    return this.atk * 2;
  },
};

export function MagicWarrior(this: any, atk: number, mgc: number) {
  this.atk = atk;
  this.mgc = mgc;
}

MagicWarrior.prototype = Object.create(Warrior.prototype);
MagicWarrior.prototype.constructor = MagicWarrior;
MagicWarrior.prototype.attack = function () {
  return this.atk * 2 + this.mgc;
};
