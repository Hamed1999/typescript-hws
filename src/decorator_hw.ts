import * as Shapes  from "./Shapes/index.js";

let s = new Shapes.Circle();
function Sauce (sauceName: string){
  return (constructor: Function) => {
    constructor.prototype.sauce = sauceName;
  }
};

@Sauce('pesto')
class Pizza {};
let myPizza = new Pizza();
console.log(myPizza);


import { calculateTax } from "./tax.js";

let tax = calculateTax(10_000);
console.log(tax);

