const m = function (...arg) {
  console.log(arg[1]);
};

const m2 = (...arg) => {
  console.log(arg[1]);
};
m("a", "b");
m2("c", "d");
