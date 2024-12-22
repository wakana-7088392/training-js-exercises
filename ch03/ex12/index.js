let obj1 = { x: 1 };
obj1.y = 1;

let obj2 = { x: 1, y: 1 };
console.log(obj1 === obj2); //-> false

export function equals(obj1, obj2) {
  if (
    // key名を一意の並び順に並べなおしたうえで比較する。
    Object.keys(obj1).sort().toString() !== Object.keys(obj2).sort().toString()
  ) {
    return false;
  }
  for (const key in obj1) {
    if (obj1[key] !== obj2[key]) return false;
  }
  return true;
}
let result = equals(obj1, obj2);

console.log(`equal? : ${result}`);
