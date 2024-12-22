// このような関数は絶対に書いてはならない。
function set42(key) {
  eval("".concat(key, " = 42;"));
}
// 例:無限ループを意図的におこすwhile文を仕込む
set42("let i = 1; while(i > 0){console.log(i); i++;}; let num");
