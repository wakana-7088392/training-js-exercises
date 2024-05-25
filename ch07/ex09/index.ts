console.log("𠮷野家"[0]);
console.log("👨‍👨‍👧‍👧"[0]);

const moji = "𠮷";
const emoji = "👨‍👨‍👧‍👧";

console.log(moji.charCodeAt(0)?.toString(16));
console.log(emoji.charCodeAt(0)?.toString(16));

const moji2 = "𠮷野家"[0];
const emoji2 = "👨‍👨‍👧‍👧"[0];

console.log(moji2.codePointAt(0)?.toString(16));
console.log(emoji2.codePointAt(0)?.toString(16));
