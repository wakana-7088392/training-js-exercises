let array = ["r", "i", "c", "o", "h"];
console.log(array);
console.log(array.length);
delete array[3];
console.log(array);
console.log(array.length);

/**
 * 出力結果
 * [ 'r', 'i', 'c', 'o', 'h' ]
 * 5
 * [ 'r', 'i', 'c', <1 empty item>, 'h' ]
 * 5
 */
