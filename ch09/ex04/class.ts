export class Warrior {
  atk: number;
  constructor(atk: number) {
    this.atk = atk;
  }
  attack(): number {
    return this.atk * 2;
  }
}

export class MagicWarrior extends Warrior {
  mgc: number;
  constructor(atk: number, mgc: number) {
    super(atk);
    this.mgc = mgc;
  }

  attack(): number {
    return this.atk * 2 + this.mgc;
  }
}
