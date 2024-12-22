console.log(Number.MAX_SAFE_INTEGER);
console.log(Number.MIN_SAFE_INTEGER);
console.log(Number.MAX_SAFE_INTEGER + 1);
console.log(Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2);

//Numberにおいて、MAX_SAFE_INTEGERやMIN_SAFE_INTEGERの実数は2の53乗-1で、1加算するとそれ以上大きい値を表現できないから。
