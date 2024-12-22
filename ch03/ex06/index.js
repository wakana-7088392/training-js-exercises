export function substring(str, indexStart, indexEnd) {
  let arr = [];

  if (indexEnd === undefined) {
    indexEnd = str.length;
  }

  if (indexStart === undefined) {
    indexStart = 0;
  }

  if (indexEnd < 0 || isNaN(indexEnd)) {
    indexEnd = 0;
  }

  if (indexStart < 0 || isNaN(indexStart)) {
    indexStart = 0;
  }

  if (!isFinite(indexEnd)) {
    indexEnd = str.length;
  }

  if (!isFinite(indexStart)) {
    indexStart = str.length;
  }

  indexStart = Math.floor(indexStart);
  indexEnd = Math.floor(indexEnd);

  for (
    let i = Math.min(indexStart, indexEnd);
    i < Math.max(indexStart, indexEnd);
    i++
  ) {
    arr.push(str[i]);
  }
  return arr.join("");
}

export function slice(str, indexStart, indexEnd) {
  let arr = [];

  if (indexEnd === undefined) {
    indexEnd = str.length;
  }

  if (indexStart === undefined) {
    indexStart = 0;
  }

  if (isNaN(indexEnd)) {
    indexEnd = 0;
  }

  if (isNaN(indexStart)) {
    indexStart = 0;
  }

  if (!isFinite(indexEnd)) {
    indexEnd = str.length;
  }

  if (!isFinite(indexStart)) {
    indexStart = str.length;
  }

  if (indexEnd < 0) {
    indexEnd = str.length + indexEnd;
  }

  if (indexStart < 0) {
    indexStart = str.length + indexStart;
  }

  indexStart = Math.floor(indexStart);
  indexEnd = Math.floor(indexEnd);

  for (let i = indexStart; i < indexEnd; i++) {
    arr.push(str[i]);
  }
  return arr.join("");
}

export function padStart(str, targetLength, padString) {
  if (padString === undefined) {
    padString = " ";
  }
  if (targetLength - str.length <= 0 || padString.length <= 0) {
    return str;
  }
  const needlength = targetLength - str.length;
  const loop = Math.ceil(needlength / padString.length);
  return substring(padString.repeat(loop), 0, needlength) + str;
}

export function trim(str) {
  return str.replace(/^ +/, "").replace(/ +$/, "");
}
