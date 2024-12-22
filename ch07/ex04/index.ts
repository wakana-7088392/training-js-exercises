const data = [
  { name: "Alice", class: "A", math: 10, chemistry: 30, geography: 20 },
  { name: "Bob", class: "A", math: 50, chemistry: 50, geography: 60 },
  { name: "Carol", class: "A", math: 70, chemistry: 55, geography: 30 },
  { name: "Dave", class: "B", math: 40, chemistry: 20, geography: 60 },
  { name: "Ellen", class: "B", math: 60, chemistry: 70, geography: 40 },
  { name: "Frank", class: "B", math: 90, chemistry: 70, geography: 80 },
  { name: "Isaac", class: "C", math: 70, chemistry: 40, geography: 50 },
  { name: "Justin", class: "C", math: 80, chemistry: 40, geography: 30 },
  { name: "Mallet", class: "C", math: 60, chemistry: 70, geography: 90 },
];
// mathの全員の合計点
let sum = data.map((x) => x.math).reduce((x, y) => x + y);
console.log(`mathの全員の合計点 = ${sum}`);

/**
 * mapでmathの値だけをまとめた配列を作り
 * reduceで作った配列の合計を出している。
 */

// クラスAのchemistryの平均点
let avgAChemi =
  data
    .filter((x) => x.class === "A")
    .map((x) => x.chemistry)
    .reduce((x, y) => x + y) / data.filter((x) => x.class === "A").length;
console.log(`クラスAのchemistryの平均点 = ${avgAChemi}`);

/**
 * filterでclassがAの要素だけを抽出し
 * mapでchemistryの値だけをまとめた配列をつくり
 * reduceで作った配列の合計を出している。
 * 合計に対し、filterでclassがAの要素だけを取り出した配列の長さで割り、平均を算出している。
 */

// 3科目合計点のクラスC内での平均点
let avgCTotal =
  data
    .filter((x) => x.class === "C")
    .map((x) => x.math + x.chemistry + x.geography)
    .reduce((x, y) => x + y) / data.filter((x) => x.class === "C").length;
console.log(`3科目合計点のクラスC内での平均点 = ${avgCTotal}`);

/**
 * filterでclassがCの要素だけを抽出し
 * mapで各要素のmath、chemistry、geographyの合計の値をまとめた配列をつくり
 * reduceで作った配列の合計を出している。
 * 合計に対し、filterでclassがCの要素だけを取り出した配列の長さで割り、平均を算出している。
 */

// 3科目合計点が最も高い人のname
let number1 = data
  .map((x) => {
    return { name: x.name, total: x.math + x.chemistry + x.geography };
  })
  .reduce((x, y) => (x.total > y.total ? x : y));

console.log(`3科目合計点が最も高い人のname = ${number1.name}`);

/**
 * mapで各要素のnameと、math・chemistry・geographyの合計の値をまとめたtotalの二つのプロパティをもつ
 * オブジェクトをまとめた配列をつくり、
 * reduceで作った配列にあるtotalの最大値をもつオブジェクトをnumber1に代入している。
 */

// 全体のgeographyの標準偏差
let avgGeo = data.map((x) => x.geography).reduce((x, y) => x + y) / data.length;
let variance =
  data.map((x) => (x.geography - avgGeo) ** 2).reduce((x, y) => x + y) /
  data.length;
let sd = Math.sqrt(variance);
console.log(`全体のgeographyの標準偏差 = ${sd}`);

/**
 * avgGeo: geographyの平均
 * variance: 分散。対象となる値と値の平均の差をべき乗し、対象の数で割った値。
 * sd: 標準偏差。分散に対する正の平方根。
 *
 * まずgeographyの平均を算出し、
 * 各要素のgeographyとavgGeoの差をべき乗した値をreduceで合算し、dataの数で割った値を求める。
 * 最後にMath.sqrtで平方根を求める。
 */
