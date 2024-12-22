export const counterGroup = () => {
  const callCount = new Array();
  return {
    newCounter: function counter() {
      let i = callCount.length;
      let n = 0;
      callCount.push(() => n);
      return {
        count: function () {
          return n++;
        },
        reset: function () {
          n = 0;
        },
      };
    },
    total: function () {
      if (callCount.length === 0) return 0;
      return callCount.map((x) => x()).reduce((x, y) => x + y);
    },
    average: function () {
      if (callCount.length < 1) throw TypeError();
      return this.total() / callCount.length;
    },
    variance: function () {
      if (callCount.length < 2) throw TypeError();
      const res =
        callCount
          .map((x) => x())
          .map((n) => (n - this.average()) ** 2)
          .reduce((x, y) => x + y) / callCount.length;
      return res;
    },
  };
};
