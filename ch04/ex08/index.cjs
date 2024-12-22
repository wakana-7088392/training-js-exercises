let a;
// let undefined = 100;
console.log(a === undefined);
console.log(a === void 0);

console.log(a === undefined);
console.log(a === void 0);

// var undefined = 100;
// console.log(a === undefined);
// console.log(a === void 0);

/**
 * Q1.if(foo === undefined) {...}をif(foo === void 0) {...}と書くのを見かけるがその理由は？
 * → undefinedはグローバルスコープ以外のスコープだと変数名として使用できるため値を設定できてしまう、
 * 　という特性から、void 0を使用したほうがより確実にundefindと返せると考えられていたため？
 * Q2.今ではこのような書き方をしないのはなぜか？
 * → 現在ではundefinedを変数名として使用することは、コード管理やデバッグが困難になってしまうという理由で非推奨とされており※、
 * 　undefinedが変数として使われることがないから？
 * 　※MDNに記載あり。(https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/undefined)
 * 　ブラウザではECMAのとあるバージョンから使えなくなっている。
 */
