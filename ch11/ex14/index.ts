/**
 * 日本語文字列の配列を受け取り、
 * 文字列中の大文字・小文字("つ"と"っ"等)、
 * 濁点・半濁点("は"と"ば"と"ば"等)の違いを無視してソートする
 * sortJapanese 関数
 */
export function sortJapanese(arr: string[]) {
  // sensitivityをbaseに大文字小文字等を無視するように設定する
  const collator = new Intl.Collator("ja", { sensitivity: "base" });
  // sortで文字列の並び替えを行う
  return arr.sort(collator.compare);
}

/**
 * Date オブジェクトを受け取り、
 * 令和6年4月2日 のように (和暦)y年m月d日 のフォーマットで日付の文字列を返す
 * toJapaneseDateString 関数
 */
export function toJapaneseDateString(date: Date) {
  // 型をIntl.DateTimeFormatを使用すると簡単だったかも
  const opts: {
    era: "long" | "short" | "narrow";
    year: "numeric" | "2-digit";
    month: "numeric" | "short";
    day: "numeric" | "2-digit";
  } = {
    // 時代を付ける
    era: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  console.log(date);
  return Intl.DateTimeFormat("ja-u-ca-japanese", opts).format(date);
}
