export const addMyCall = (f: any) => {
  f.myCall = function (o: any, ...x: any) {
    const b = f.bind(o);
    return b(...x);
  };
};
