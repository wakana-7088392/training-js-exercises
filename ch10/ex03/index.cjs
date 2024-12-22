// module.cjsにあるクラスとメソッドをrequireでインポートして利用している。
const a = require("./module.cjs");
console.log(a.greet("Taro"));
const human = new a.Human("Taro", 20);
console.log(human.introduce());
