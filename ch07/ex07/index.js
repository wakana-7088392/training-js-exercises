let array = [8, 5, 1, 4, 7, 3, 6, 2];

export const sort = (array) => {
  if (array.length <= 1) {
    return array;
  }

  const center = Math.floor(array.length / 2);
  const left = array.slice(0, center);
  const right = array.slice(center);

  return merge(sort(left), sort(right));
};

const merge = (lArray, rArray) => {
  let resArray = new Array();
  while (lArray.length && rArray.length) {
    if (lArray[0] < rArray[0]) {
      resArray = [...resArray, lArray.shift()];
    } else {
      resArray = [...resArray, rArray.shift()];
    }
  }
  return [...resArray, ...lArray, ...rArray];
};

console.log(sort(array));
