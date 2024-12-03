export class HiraganaUtf16 {
  hiragana: string;
  utf16: number;

  constructor(hiragana: string) {
    // 平仮名一文字であるかを判定する
    if (!/^[\u3040-\u309F]$/.test(hiragana)) {
      throw new Error("平仮名一文字のみ有効");
    }

    this.hiragana = hiragana;
    this.utf16 = hiragana.charCodeAt(0);
  }

  // <や>で比較できるように定義する
  [Symbol.toPrimitive](hint: any) {
    if (hint === "number") {
      return this.utf16;
    } else if (hint === "string") {
      return this.hiragana;
    } else {
      // ここは無駄な分岐なので、端折る
      return this.hiragana;
    }
  }
}

export function sortHiragana(arr: HiraganaUtf16[]): HiraganaUtf16[] {
  // <で比較しているため、数値判定されutf16コード単位の値が返って数値が比較される。
  return arr.sort((a, b) => (a < b ? -1 : 1));
}

// const hArr = [
//   new HiraganaUtf16("あ"),
//   new HiraganaUtf16("う"),
//   new HiraganaUtf16("お"),
//   new HiraganaUtf16("い"),
//   new HiraganaUtf16("え"),
// ];

// console.log(sortHiragana(hArr));
