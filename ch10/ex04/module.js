import Dog from "./module_dog.js";
// 関数の名前変更を伴うインポート
import { greet as greetDog } from "./module_dog.js";
export { Dog, greetDog };
// クラスの再エクスポート
export { Cat, default as greetCat } from "./module_cat.js";
// 関数の再エクスポート
export { eat } from "./module_tanuki.js";

// console.log(greetDog("Pochi"));
// console.log(greetCat("Tama"));
