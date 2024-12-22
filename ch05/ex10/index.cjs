const human = {
  name: "taro",
  age: 20,
};

// console.time("with");
// for (let i = 0; i < 10; i++) {
//   with (human) {
//     console.log(name + " " + age + "歳");
//   }
// }
// console.timeEnd("with");

console.time("noWith");
for (let i = 0; i < 10; i++) {
  console.log(human.name + " " + human.age + "歳");
}
console.timeEnd("noWith");

/**
 * 計測結果
 * 1回目
 * with: 8.768ms
 * noWith: 5.031ms
 * 2回目
 * with: 9.61ms
 * noWith: 1.936ms
 * 3回目
 * with: 8.792ms
 * noWith: 2.025ms
 * 4回目
 * with: 7.876ms
 * noWith: 2.283ms
 * 5回目
 * with: 8.456ms
 * noWith: 1.912ms
 *
 * 教材にも記述があったが、処理速度がwithの方が遅かった。
 * また2回目以降withを使用しない場合は処理速度がかなり上がったが、
 * withを使用した場合はさほど変化がなかった。
 *
 * withだとループするたびにルックアップする
 */
