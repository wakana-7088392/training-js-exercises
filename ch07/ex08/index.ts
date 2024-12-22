export const reverse = (str: string) => {
  const segmenterFr = new Intl.Segmenter("fr", { granularity: "grapheme" });
  const iterator = segmenterFr.segment(str)[Symbol.iterator]();
  return [...iterator]
    .map((k) => k.segment)
    .reverse()
    .join("");
  // let reversed = "";
  // for (let moji of iterator) {
  //   reversed = moji.segment + reversed;
  // }
  // return reversed;
};
console.log("家族👨‍👨‍👧‍👧");
console.log(reverse("家族👨‍👨‍👧‍👧"));
