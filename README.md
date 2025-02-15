# Castium

**Castium** is a lightweight TypeScript utility for safe and chainable type conversion in JavaScript and TypeScript. It allows you to transform values between types with ease while handling edge cases gracefully.

## Installation

```sh
npm install castium
```

or with yarn:

```sh
yarn add castium
```

## Usage

Import the `c` function and use it to create a chainable conversion.

```ts
import { c } from "castium";

const result = c("0  ").string().number().boolean().get();
console.log(result); // false
```

### API Methods

Below is a list of available methods in **Castium**, along with examples:

---

### `.number(defaultValue?)`

Converts the value to a number.

```ts
c("42").number().get(); // 42
c("abc").number().get(); // null
c("abc").number(0).get(); // 0 (default value provided)
c("۱۲۳").number().get(); // 123
c("٣٤٥.٧").number().get(); // 345.7
c("1,200 تومان").number().get(); // 1200
c("text").number(0).get(); // 0 (default value provided)
c("  ٥٠٠٠  ").number().get(); // 5000
c("۴۲.۵۶").number().get(); // 42.56
c("12.34.56").number().get(); // null (default value provided)
```

---

### `.string()`

Converts the value to a trimmed string.

```ts
c(42).string().get(); // "42"
c(null).string().get(); // ""
c({ key: "value" }).string().get(); // "{"key":"value"}"
```

---

### `.boolean()`

Converts the value to a boolean.

```ts
c(1).boolean().get(); // true
c(0).boolean().get(); // false
c("true").boolean().get(); // true
c("false").boolean().get(); // true (non-empty string is truthy)
```

---

### `.booleanString()`

Safely converts "true" or "false" string values to actual booleans.

```ts
c("true").booleanString().get(); // true
c("false").booleanString().get(); // false
c("random").booleanString().get(); // null
```

---

### `.date()`

Converts the value to a valid JavaScript `Date` object.

```ts
c("2023-12-25").date().get(); // Date object (Dec 25, 2023)
c("invalid").date().get(); // null
```

---

### `.isoDate()`

Converts the value to an ISO date string.

```ts
c("2023-12-25").isoDate().get(); // "2023-12-25T00:00:00.000Z"
c("invalid").isoDate().get(); // null
```

---

### `.fromDate()`

Sets the time of a date object to `00:00:00` (start of the day).

```ts
c("2023-12-25").fromDate().get(); // Date object at 00:00:00
```

---

### `.toDate()`

Sets the time of a date object to `23:59:59.999` (end of the day).

```ts
c("2023-12-25").toDate().get(); // Date object at 23:59:59.999
```

---

### `.dateTime()`

Converts the date to a timestamp (`getTime()`).

```ts
c("2023-12-25").dateTime().get(); // 1703462400000
```

---

### `.array()`

Parses a JSON string into an array.

```ts
c("[1,2,3]").array().get(); // [1, 2, 3]
c("invalid").array().get(); // null
```

---

### `.object()`

Parses a JSON string into an object.

```ts
c('{"key":"value"}').object().get(); // { key: "value" }
c("invalid").object().get(); // null
```

---

### `.nullable()`

Converts empty strings, `null`, and `undefined` to `null`.

```ts
c("").nullable().get(); // null
c("hello").nullable().get(); // "hello"
```

---

### `.undefined()`

Converts empty strings and `null` to `undefined`.

```ts
c("").undefined().get(); // undefined
```

---

### `.default(defaultValue)`

Provides a fallback value when the original value is `null`, `undefined`, or an empty string.

```ts
c(null).default("fallback").get(); // "fallback"
```

---

### `.transform(fn, defaultValue?)`

Applies a transformation function to the value.

```ts
c("5")
  .transform((v) => Number(v) * 2)
  .get(); // 10
```

---

### `.json()`

Parses a JSON string.

```ts
c('{"a": 1}').json().get(); // { a: 1 }
c("invalid").json().get(); // null
```

---

### `.match(regex)`

Checks if a string matches a regular expression.

```ts
c("hello").match(/^h/).get(); // true
c("world").match(/^h/).get(); // false
```

---

### `.oneOf(...values)`

Checks if the value is in a given set.

```ts
c("apple").oneOf("apple", "banana").get(); // true
c("orange").oneOf("apple", "banana").get(); // false
```

---

### `.clamp(min, max)`

Restricts a number to be within a range.

```ts
c(5).clamp(1, 10).get(); // 5
c(-2).clamp(1, 10).get(); // 1
c(20).clamp(1, 10).get(); // 10
```

---

## Conclusion

**Castium** simplifies type conversions in JavaScript and TypeScript while handling edge cases. It’s ideal for processing API responses, user inputs, and dynamic data sources efficiently.

Try it now and enjoy seamless data transformations! 🚀
