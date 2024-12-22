// 何らかのリサイズを行う関数と思って読んで下さい
//
// - params には undefined またはオブジェクトが与えられる
// - params.maxWidth が与えられる場合 (正の整数と仮定して良い) はその値を利用する
// - params.maxHeight が与えられる場合 (正の整数と仮定して良い) はその値を利用する
const params1 = {
  maxWidth: 700,
  maxHeight: 500,
};

const params2 = undefined;

function resize(params) {
  let maxWidth = 600;
  let maxHeight = 480;
  if (params && params.maxWidth) {
    maxWidth = params.maxWidth;
  }
  if (params && params.maxHeight) {
    maxHeight = params.maxHeight;
  }
  console.log({ maxWidth: maxWidth, maxHeight: maxHeight });
}
resize(params1);
resize(params2);
function resize1(params) {
  let maxWidth = (params && params.maxWidth) || 600;
  let maxHeight = (params && params.maxHeight) || 480;

  console.log({ maxWidth, maxHeight });
}
resize1(params1);
resize1(params2);
function resize2(params) {
  let maxWidth = params?.maxWidth ?? 600;
  let maxHeight = params?.maxHeight ?? 480;
  console.log({ maxWidth, maxHeight });
}
resize2(params1);
resize2(params2);
