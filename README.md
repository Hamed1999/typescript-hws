

# ⚡ TypeScript Homeworks & Trainings

This repository contains **my training exercises and homework solutions** from the [**“The Ultimate TypeScript”**](https://codewithmosh.com/p/the-ultimate-typescript) course by *Mosh Hamedani*.
It covers TypeScript from beginner to advanced topics with practical code examples — including decorators, generics, and compiler configuration.

---

## 🧠 Course Overview

Throughout this course, I learned:

* TypeScript fundamentals
* Advanced type system (generics, type mapping, keyof operator)
* Object-oriented features (classes, interfaces, inheritance)
* Working with third-party libraries (like `jsdom`)
* Decorators for classes, methods, and properties
* Using TypeScript with Node.js and Express
* Building React projects with TypeScript templates

---

## 🧩 Key Commands & Setup

Below are the main setup and development commands used throughout the course:

| Purpose                                      | Command                                                             |
| -------------------------------------------- | ------------------------------------------------------------------- |
| Install TypeScript globally                  | `npm i -g typescript`                                               |
| Compile `.ts` file                           | `tsc index.ts`                                                      |
| Initialize `tsconfig.json`                   | `tsc --init`                                                        |
| Compile using config                         | `tsc`                                                               |
| Run TypeScript directly with Node            | `npx ts-node index.ts`                                              |
| Install `ts-node` globally                   | `npm i -g ts-node`                                                  |
| Install `jsdom` (for DOM simulation in Node) | `npm install jsdom`                                                 |
| Create React app with TS template            | `npx create-react-app reminders-app --template typescript`          |
| Install Bootstrap                            | `npm i bootstrap`                                                   |
| Use Axios for API calls                      | `npm i axios`                                                       |
| Set up Node + Express + TS                   | `npm i express`<br>`npm i -D typescript @types/node @types/express` |
| Auto-reload with Nodemon                     | `npm i -D nodemon`                                                  |

Example addition to **`package.json`**:

```json
"type": "module",
"start": "nodemon index.ts"
```

---

## 📘 Code Topics Demonstrated

### 🧱 1. Classes & Constructors

```ts
class User {
  constructor(public id: number = 0, public name: string = "Hamed") {}
}
```

Demonstrates overloading, optional parameters, and object creation with default values.

---

### 🔢 2. Enums & Functions

```ts
const enum Size { Small = 1, Medium, Large };
let mySize: Size = Size.Medium;

function calculateTax(income: number, taxYear = 2024): number {
  return taxYear < 2024 ? income * 0.2 : income * 0.3;
}
```

---

### ⚖️ 3. Union Types & Type Narrowing

```ts
function kgToLbs(weight: number | string): number {
  return typeof weight === "number" ? weight * 2.2 : parseInt(weight) * 2.2;
}
```

---

### 🧩 4. Index Signatures

```ts
class SeatAssignment {
  [seatNumber: string]: string;
}
```

Allows flexible property assignment (e.g., `seats.A1 = "Hamed"`).

---

### 🧬 5. Generics & keyof Operator

```ts
function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map(item => item[key]);
}
```

Used to extract specific property values from a generic type safely.

---

### 🔒 6. Type Mapping

```ts
type ReadOnly<T> = {
  readonly [K in keyof T]: T[K];
};
```

Transforms all properties of `T` into read-only types.

---

### 🎨 7. Decorators

Includes:

* **Class decorators** (`@Component`, `@Pipe`)
* **Method decorators** (`@Log`, `@Capitalize`)
* **Property decorators** (`@MinLength`)
* **Parameter decorators** (`@Watch`)

Example:

```ts
@Component({ selector: "#my-profile" })
@Pipe
class ProfileComponent {}
```

Demonstrates how decorators can modify class behavior at runtime and add metadata.

---

## 🧰 Example Output

```
Component decorator called.
Pipe decorator called.
products [ { id: 1, title: 'Laptop', price: 1200 }, { id: 2, title: 'Phone', price: 800 } ]
titles [ 'Laptop', 'Phone' ]
prices [ 1200, 800 ]
Hamed SALMANIZADEGAN
Hamed is saying: "I am alive :)"
```

---

## 🧑‍💻 Author

**Hamed Salmanizadegan**
Learning and teaching TypeScript through real-world examples and practical software patterns.
📍 [GitHub Profile](https://github.com/Hamed1999)

