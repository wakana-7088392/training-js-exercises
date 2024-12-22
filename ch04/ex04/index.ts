export const bitCount = (num: number) => {
  console.log(num);
  let count = 0;
  for (let i = 1; i <= 32; i++) {
    const bit = 0b1;
    count += num & bit;
    num = num >> 1;
  }
  return count;
};

console.log(bitCount(0b111));

// >>だと、仮に-にした場合、while文だと無限ループになる
