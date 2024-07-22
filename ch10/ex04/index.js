import * as animal from "./module.js";
import { Tanuki } from "./module_tanuki.js";

console.log(animal.greetDog("Pochi"));
console.log(animal.greetCat("Tama"));

const cat = new animal.Cat("Tama", 2);
const dog = new animal.Dog("Pochi", 2);
console.log(dog.introduce());
console.log(cat.introduce());

const tanuki = new Tanuki("Tyoro", 19);
