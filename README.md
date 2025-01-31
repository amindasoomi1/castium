# Castium

🚀 **Castium** is the simplest way to transform data types in JavaScript!

After a lot of hard work, Castium has finally been released! 🎉

A small, practical, and chainable tool for transforming data types in JavaScript and Node.js.

🔗 [Castium on NPM](https://lnkd.in/dGnSvCCs)

## Features

Castium provides an easy way to convert values into different types such as:

- Convert a value to a number, string, or boolean.
- Convert dates into standard formats.
- Work with arrays and objects.
- Set default values for `null` or `undefined`.
- And many other capabilities!

## Key Features

- ✅ Convert to **Number**, **String**, **Boolean** → `.number()`, `.string()`, `.boolean()`
- ✅ Work with **Dates** → `.date()`, `.isoDate()`, `.fromDate()`, `.toDate()`
- ✅ Convert to **Array** and **Object** → `.array()`, `.object()`
- ✅ Set **Default Values** and handle **Nullability** → `.default()`, `.nullable()`
- ✅ Use **Custom Transformation Functions** → `.transform(fn)`

## Installation

To install Castium, use npm:

```bash
npm install castium
```

## Usage

Once installed, you can easily use Castium to transform data:

```javascript
import { c } from "castium";

console.log(c("42").number().get()); // 42
console.log(c(1).boolean().get()); // true
console.log(c("2025-01-30").date().isoDate().get()); // "2025-01-30T00:00:00.000Z"
console.log(c("").nullable().default("No data").get()); // "No data"
```

## Methods

Here are the available methods in Castium for transforming data:

### `.number()`

- Converts the value to a number.

### `.string()`

- Converts the value to a string.

### `.boolean()`

- Converts the value to a boolean.

### `.date()`

- Converts the value to a JavaScript Date object.

### `.isoDate()`

- Converts the value to an ISO string representation of the date.

### `.fromDate()`

- Converts a JavaScript Date object into a formatted string.

### `.toDate()`

- Converts the value to a Date object.

### `.array()`

- Converts the value to an array.

### `.object()`

- Converts the value to an object.

### `.nullable()`

- Allows the value to be `null`.

### `.default(value)`

- Sets a default value if the value is `null` or `undefined`.

### `.transform(fn)`

- Allows custom transformations using a function.

### Example Usage:

```javascript
const result = c("42").number().boolean().get();

console.log(result); // true
```
