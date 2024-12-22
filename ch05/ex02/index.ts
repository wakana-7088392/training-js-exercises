const s = '1\0a2\b3\t4\n5\v6\f7\r8"\\';

export const replaceIfElse = (s: string) => {
  let res = "";
  for (let moji of s) {
    if (moji === "\0") {
      res += "\\0";
    } else if (moji === "\b") {
      res += "\\b";
    } else if (moji === "\t") {
      res += "\\t";
    } else if (moji === "\n") {
      res += "\\n";
    } else if (moji === "\v") {
      res += "\\v";
    } else if (moji === "\f") {
      res += "\\f";
    } else if (moji === "\r") {
      res += "\\r";
    } else if (moji === '"') {
      res += '\\"';
    } else if (moji === "\\") {
      res += "\\\\";
    } else {
      res += moji;
    }
  }
  return res;
};

export const replaceSwitch = (s: string) => {
  let res = "";
  for (let moji of s)
    switch (moji) {
      case "\0":
        res += "\\0";
        break;
      case "\b":
        res += "\\b";
        break;
      case "\t":
        res += "\\t";
        break;
      case "\n":
        res += "\\n";
        break;
      case "\v":
        res += "\\v";
        break;
      case "\f":
        res += "\\f";
        break;
      case "\r":
        res += "\\r";
        break;
      case '"':
        res += '\\"';
        break;
      case "\\":
        res += "\\\\";
        break;
      default:
        res += moji;
    }
  return res;
};

console.log(replaceIfElse(s));
console.log(replaceSwitch(s));
