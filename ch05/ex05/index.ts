let example = { a: 1, b: 2, c: 3 };

export const deleteOdd = (obj: any) => {
  for (let o in obj) {
    console.log(obj[o]);
    if (obj[o] % 2) {
      delete obj[o];
      console.log("削除しました");
    }
  }
  console.log(obj);
};
deleteOdd(example);

/**
 * hasOwnProperty　他のクラスを継承したプロパティを除外する
 */
