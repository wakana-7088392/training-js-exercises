import * as animal from "./module.js";
// クラスの名前変更を伴うインポート
import { Tanuki as Tanu } from "./module_tanuki.js";
import greetTanuki from "./module_tanuki.js";

console.log(animal.greetDog("Pochi"));
console.log(animal.greetCat("Tama"));
console.log(greetTanuki("Choro"));

const cat = new animal.Cat("Tama", 2);
const dog = new animal.Dog("Pochi", 2);
console.log(dog.introduce());
console.log(cat.introduce());

const tanuki = new Tanu("Choro", 19);
console.log(tanuki.introduce());

console.log(animal.eat());
