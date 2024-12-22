let a = 0,
  b = 0;

// prettier-ignore
const c
=
a
// prettier-ignore
++
b

console.log(a, b, c);

// prettier-ignore
const e = a++
b;

console.log(a, b, e);

/*出力結果は以下の通り
 *0 1 0
 *1 1 0
 *
 * 5-6 const c = a; ++b;
 * 15-16 const e = a++; b;
 * eにaの値が代入されてからaが加算されるため。e=0でa=1。
 */
