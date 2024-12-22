var data = [
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
var sum = data.map(function (x) { return x.math; }).reduce(function (x, y) { return x + y; });
console.log("math\u306E\u5168\u54E1\u306E\u5408\u8A08\u70B9 = ".concat(sum));
/**
 * mapでmathの値だけをまとめた配列を作り
 * reduceで作った配列の合計を出している。
 */
// クラスAのchemistryの平均点
var avgAChemi = data
    .filter(function (x) { return x.class === "A"; })
    .map(function (x) { return x.chemistry; })
    .reduce(function (x, y) { return x + y; }) / data.filter(function (x) { return x.class === "A"; }).length;
console.log("\u30AF\u30E9\u30B9A\u306Echemistry\u306E\u5E73\u5747\u70B9 = ".concat(avgAChemi));
/**
 * filterでclassがAの要素だけを抽出し
 * mapでchemistryの値だけをまとめた配列をつくり
 * reduceで作った配列の合計を出している。
 * 合計に対し、filterでclassがAの要素だけを取り出した配列の長さで割り、平均を算出している。
 */
// 3科目合計点のクラスC内での平均点
var avgCTotal = data
    .filter(function (x) { return x.class === "C"; })
    .map(function (x) { return x.math + x.chemistry + x.geography; })
    .reduce(function (x, y) { return x + y; }) / data.filter(function (x) { return x.class === "C"; }).length;
console.log("3\u79D1\u76EE\u5408\u8A08\u70B9\u306E\u30AF\u30E9\u30B9C\u5185\u3067\u306E\u5E73\u5747\u70B9 = ".concat(avgCTotal));
/**
 * filterでclassがCの要素だけを抽出し
 * mapで各要素のmath、chemistry、geographyの合計の値をまとめた配列をつくり
 * reduceで作った配列の合計を出している。
 * 合計に対し、filterでclassがCの要素だけを取り出した配列の長さで割り、平均を算出している。
 */
// 3科目合計点が最も高い人のname
var number1 = data
    .map(function (x) {
    return { name: x.name, total: x.math + x.chemistry + x.geography };
})
    .reduce(function (x, y) { return (x.total > y.total ? x : y); });
console.log("3\u79D1\u76EE\u5408\u8A08\u70B9\u304C\u6700\u3082\u9AD8\u3044\u4EBA\u306Ename = ".concat(number1.name));
/**
 * mapで各要素のnameと、math・chemistry・geographyの合計の値をまとめたtotalの二つのプロパティをもつ
 * オブジェクトをまとめた配列をつくり、
 * reduceで作った配列にあるtotalの最大値をもつオブジェクトをnumber1に代入している。
 */
// 全体のgeographyの標準偏差
var avgGeo = data.map(function (x) { return x.geography; }).reduce(function (x, y) { return x + y; }) / data.length;
var variance = data.map(function (x) { return Math.pow((x.geography - avgGeo), 2); }).reduce(function (x, y) { return x + y; }) /
    data.length;
var sd = Math.sqrt(variance);
console.log("\u5168\u4F53\u306Egeography\u306E\u6A19\u6E96\u504F\u5DEE = ".concat(sd));
