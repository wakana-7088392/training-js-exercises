const reverse = (str) => {
  const segmenterFr = new Intl.Segmenter("fr", { granularity: "grapheme" });
  const iterator = segmenterFr.segment(str)[Symbol.iterator]();
  let array = new Array();
  for (let moji of iterator) {
    array = [moji.segment, ...array];
  }
  return array;
};
console.log("家族👨‍👨‍👧‍👧");
console.log(reverse("家族👨‍👨‍👧‍👧"));
