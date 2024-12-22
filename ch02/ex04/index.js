console.log(
  "\u0048\u0065\u006c\u006c\u006f\u002c\u0057\u006f\u0072\u006c\u0064"
);

const x = () =>
  [..."Hello,World"].map(
    (y) => "\\u" + y.charCodeAt(0).toString(16).padStart(4, "0")
  );

console.log(x().join(""));
