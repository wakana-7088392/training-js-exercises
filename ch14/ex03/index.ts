export class IgnoreAccentPattern {
  private pattern: string | RegExp;
  constructor(pattern: string | RegExp) {
    if (typeof pattern === "string") {
      this.pattern = new RegExp(this.normalize(pattern), "g");
    } else {
      this.pattern = new RegExp(this.normalize(pattern.source), pattern.flags);
    }
  }
  // NFDで文字とダイアクリティカルマークを分離したのち、そのマークを削除(空文字に置き換える)
  private normalize(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  // パターン検索(どこにあるか)
  [Symbol.search](str: string): number {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .search(this.pattern);
  }

  // パターンマッチ(該当文字列抽出)
  [Symbol.match](str: string): RegExpMatchArray | null {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .match(this.pattern);
  }
}

// /[\u0300-\u036f]/の箇所は定数(変数)化したほうがいい。
