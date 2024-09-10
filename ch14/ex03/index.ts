export class IgnoreAccentPattern {
  private pattern: string | RegExp;
  constructor(pattern: string | RegExp) {
    if (typeof pattern === "string") {
      this.pattern = new RegExp(this.normalize(pattern), "g");
    } else {
      this.pattern = new RegExp(this.normalize(pattern.source), pattern.flags);
    }
  }

  private normalize(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  [Symbol.search](str: string): number {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .search(this.pattern);
  }

  [Symbol.match](str: string): RegExpMatchArray | null {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .match(this.pattern);
  }
}
