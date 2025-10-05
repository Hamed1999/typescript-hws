/*
To instal type script:                            npm i -g typescript 
To compile ts to js:                              tsc index.ts
To create a configuration file for compiler:      tsc --init
To compile using configuration file:              tsc
In the launch.json file, add:                     "preLaunchTask": "tsc: build - tsconfig.json"      
DOM simulation library like jsdom:                npm install jsdom
To create a React by typescript template:         npx create-react-app reminders-app --template typescript
                                                  npm i bootstrap
To use back-end API:                              npm i axios
To run TS with node:                              npm init -y
                                                  npm i -D ts-node
                                                  npm i -g ts-node (use ts-node index.ts to to run it)
Node & Express with typescript packages:          npm i express
                                                  npm i -D typescript @types/node @types/express
In the package.json add:                          "type": "module"
                                                  "start": "nodemon index.ts"
                                                  npm i -D nodemon
*/

class User {
id: number;
name: string;
constructor();
constructor(id: number, name: string);
constructor(id?:number, name?:string){
  this.name = name ?? "Hamed";
  this.id = id ?? 0;
}
};

let uesrArray: User[] = [new User(), new User(2, "Ali")];
console.log(uesrArray);

const enum Size {Small = 1, Medium, Large};
let mySize: Size = Size.Medium;
console.log(mySize);

function calculateTax(income: number, taxYear = 2024): number {
  if (taxYear < 2024)
    return income * 0.2;
  return income * 0.3;
}
console.log(calculateTax(50_002));

function kgToLbs(weight: number | string): number{
  if (typeof weight === "number")
    return weight * 2.2;
  else
    return parseInt(weight) * 2.2;
}

console.log(kgToLbs("10kg"));

type Measure = "cm" | "inch" | "m"; // literal

let length: Measure = "m";
console.log(length);



import { JSDOM } from "jsdom";
const dom = new JSDOM(`<input id="myInput" value="Hello">`);
const input = <HTMLInputElement> dom.window.document.getElementById("myInput");

function render(inputElement: HTMLInputElement | undefined | null): void {
    console.log("Output:", inputElement?.value ?? "empty");
}
render(input);
render(null);

function f(a?:number, b?:number): void{
  let c = a ?? 0;
  c = b ?? 0;
  console.log(c);
}

f();


/**
 * Index Signatures
 */
class SeatAssignment {
[seatNumber: string]: string;
};

let seats = new SeatAssignment();

seats.A1 = "Hamed";
seats.A2 = "Ali";
seats["A3"] = "Mahdi";

console.log(seats);


type MyType = {
  name: string;
  fun(): void;
};

// interface MyType {
//   name: string;
//   fun():void;
// };

class MyClas implements MyType{
  constructor (public name: string){}
  fun(): void {
    throw new Error("Method not implemented.");
  }
};


/*
* keyof Opertor
* For Generic Classes & Functions
*/
function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map(item => item[key]);
}

interface Product {
  id: number;
  title: string;
  price: number;
}

const products: Product[] = [
  { id: 1, title: "Laptop", price: 1200 },
  { id: 2, title: "Phone", price: 800 }
];
console.log("products", products);

const titles = pluck(products, "title"); // ✅ string[]
const prices = pluck(products, "price"); // ✅ number[]
console.log("titles", titles);
console.log("prices", prices);


/*
  Type mapping 
*/

type ReadOnly<T> = {
  readonly [K in keyof T]: T[K];
}

let readonlyProducts: ReadOnly<Product>[] = [
  { id: 1, title: "Laptop", price: 1200 },
  { id: 2, title: "Phone", price: 800 }
];

console.log(readonlyProducts[0]?.price);
console.log();

/*
* Decorators
*/

type ComponentOptions = {
  selector: string
}

function Component(options: ComponentOptions){
  return (constructor: Function) => {
    console.log("Component decorator called.");
    constructor.prototype.uniqueId = Date.now();
    constructor.prototype.options = options;
    constructor.prototype.insertInDOM = () => {
      console.log("Inserting the component in the DOM.");
    }
    console.log();
  } 
};

function Pipe(constructor: Function){
  console.log("Pipe decorator called.");
  constructor.prototype.pipe = true;
  
}

@Component({selector: "#my-profile"})
@Pipe
class ProfileComponent {
};


function Capitalize(target: any, propertyKey: string, descripter: PropertyDescriptor){
  const orginal = descripter.get as Function; // fullName function
  descripter.get = function (){
    const result = orginal?.call(this);
    return (typeof result === "string") ? result.toUpperCase() : result; 
  }
};


function Log(target: any, propertyKey: string, descripter: PropertyDescriptor){
  const original = descripter.value as Function;
  descripter.value = function(...any: any){
    console.log();
    console.log("Befor talking begins ...");
    original.call(this, any);
    console.log("Talking ends ...");
  }
}

class Person{
  constructor(public firstName: string, public lastName: string){};

  @Capitalize
  get fullName(): string{
    // return null;
    return `${this.firstName} ${this.lastName}`;
  }

  @Log
  talk(message: string): void {
    console.log(`${this.firstName} is saying: "${message}."`);
  }
};


let person = new Person("Hamed", "Salmanizadegan");
console.log(person.fullName);
person.talk("I am alive : )");
console.log();

function MinLength(length: number){
  console.log(`Min password length: ${length}`);
  
  return (target: any, propertyName: string) => {
    let value: string;
    const descriptor: PropertyDescriptor = {
      get() {
        console.log("Get");
        return value;
      },
      set(newValue: string) {
        if (newValue.length < length)
          throw new Error(`${propertyName} should be at least ${length} characters long.`);
        value = newValue;
        console.log("Set");
      }
    };
    
    Object.defineProperty(target, propertyName, descriptor);
  }
} 

class MyUser {
  @MinLength(8)
  declare password: string;

  constructor(password: string){
    this.password = password;
  }
};

try{
  let user = new MyUser("12345678");
  console.log(user.password);
  user.password = "12324";
  console.log(user.password);
} catch(e){
  console.error(e);
}
console.log();

type WatchedParameter = {
  methodName: string,
  parameterIndex: number
};
const watchedParameters: WatchedParameter[] = [];
function Watch(trget: any, methodName: string, parameterIndex: number){
  watchedParameters.push({methodName, parameterIndex});
};

class Vehicle{
  move(@Watch speed: number){}
};
console.log(watchedParameters);

