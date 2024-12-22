function counterIter(max: number) {
  console.log("counterIter");
  let c = 1;
  return {
    [Symbol.iterator]() {
      console.log("counterIter: Symbol.iterator");
      return this;
    },
    next() {
      console.log("counterIter: next");
      if (c >= max + 1) {
        return { value: undefined, done: true };
      }
      const value = c;
      c++;
      return { value, done: false };
    },
    return(value: number) {
      console.log("counterIter: return:", value);
      return { value, done: true };
    },
    throw(e: Error) {
      console.log("counterIter: throw:", e);
      throw e;
    },
  };
}

function* counterGen(max: number) {
  console.log("counterGen");
  try {
    for (let c = 1; c <= max; c++) {
      console.log("counterGen: next");
      yield c;
    }
  } catch (e) {
    console.log("counterGen: catch:", e);
  } finally {
    console.log("counterGen: finally");
  }
}

console.log("-------------------------");
console.log("明示的に呼び出す(counterIter)");
const ci1 = counterIter(10);
console.log(ci1.next());
console.log(ci1.return(5));
// console.log(ci1.throw(new Error()));

console.log("-------------------------");
console.log("明示的にnext()を呼び出し、間接的にreturn()を呼び出す(counterGen)");
const cg1 = counterGen(5);
console.log(cg1.next());
console.log(cg1.next());
console.log(cg1.next());
console.log(cg1.next());
console.log(cg1.next());
console.log(cg1.next());

console.log("-------------------------");
console.log("明示的にthrowを呼ぶ(counterGen)");
const cg2 = counterGen(5);
while (!cg2.next().done) {
  const c = cg2.next().value;
  if (c === 2) {
    cg2.throw(new Error());
  }
  console.log(c);
}

console.log("-------------------------");
console.log("明示的にreturn()を呼ぶ(CounterGen)");
const cg3 = counterGen(5);
console.log(cg3.next());
console.log(cg3.return());
