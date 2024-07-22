import Dog from "./module_dog.js";
import { greet as greetDog } from "./module_dog.js";
export { Dog, greetDog };
export { Cat, greet as greetCat } from "./module_cat.js";

// console.log(greetDog("Pochi"));
// console.log(greetCat("Tama"));
