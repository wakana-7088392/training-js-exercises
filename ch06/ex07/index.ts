export const assign = (target: Object, ...source: Object[]) => {
  for (let o of source) {
    for (let key of Object.keys(o)) {
      target[key] = o[key];
    }
    for (let sym of Object.getOwnPropertySymbols(o)) {
      target[sym] = o[sym];
    }
  }
};

export const assign2 = (target: Object, ...source: Object[]) => {
  Object.assign(target, ...source);
};

// コピー先オブジェクト
let targetO = { 1: "1" };
// 継承プロパティがコピーされないことを確認する用のオブジェクト
let proto = { p1: "proto1", p2: "proto2" };
// コピー元の基本となるオブジェクト
const o1 = Object.create(proto);
o1["x"] = "x";
o1["y"] = "y";
let oSym = Symbol("oPropname");
o1[oSym] = "oSym";

console.log(o1);
assign(targetO, o1);
console.log(targetO);

/**
 * 等価な関数
 * 6.7に記載されたObject.assign()の仕様
 * ・引数は2つ以上
 * 　・1つ目がコピー先で、2つ目以降がコピー元
 * ・コピー元のオブジェクト毎に列挙可な独自プロパティをコピー先にコピーする
 * ・コピー先は変更され、コピー元は変更されない
 * ・プロパティ名がSymbolのものもコピーされる
 * ・引数としてあてられた順番にコピーされる
 * 　・この性質から、同じ名前でプロパティが定義された場合は上書きされ、後の引数の者が最終的に残る
 * ・コピー時は通常の読み出しと設定処理が行われる
 * 　・コピー元オブジェクトがゲッターメソッドを持っていたり、コピー先オブジェクトがセッターメソッドを持っている
 * 　　場合は、コピー時にそれらのメソッドが呼び出される
 * 　・メソッド自身はコピーされない
 */
