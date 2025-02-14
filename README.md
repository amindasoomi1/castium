# Castium

**Castium** is a lightweight, chainable TypeScript/JavaScript utility for safely converting and transforming data types.

## Installation

You can install **Castium** using npm:

```sh
npm install castium
```

Or using yarn:

```sh
yarn add castium
```

## Usage

Import **Castium** and use it to safely convert values:

```typescript
import { c } from "castium";

const result = c("0  ").string().number().boolean().get(); // false
```

## Features

### Convert to Number

```typescript
c("42").number().get(); // 42
c("invalid").number().get(); // null
c(null).number(0).get(); // 0 (default value)
```

### Convert to String

```typescript
c(123).string().get(); // "123"
c(null).string().get(); // ""
```

### Convert to Boolean

```typescript
c(1).boolean().get(); // true
c(0).boolean().get(); // false
```

### Convert Boolean Strings

```typescript
c("true").booleanString().get(); // true
c("false").booleanString().get(); // false
c("random").booleanString().get(); // null
```

### Convert to Date

```typescript
c("2023-01-01").date().get(); // Date object
c("invalid").date().get(); // null
```

### Convert to ISO Date String

```typescript
c("2023-01-01").isoDate().get(); // "2023-01-01T00:00:00.000Z"
```

### Convert to Start/End of Day

```typescript
c("2023-01-01").fromDate().get(); // 2023-01-01T00:00:00.000Z
c("2023-01-01").toDate().get(); // 2023-01-01T23:59:59.999Z
```

### Convert to Date Timestamp

```typescript
c("2023-01-01").dateTime().get(); // 1672444800000
```

### Convert to Array

```typescript
c("[1,2,3]").array().get(); // [1, 2, 3]
c("invalid").array().get(); // null
```

### Convert to Object

```typescript
c('{"key": "value"}').object().get(); // { key: "value" }
c("invalid").object().get(); // null
```

### Handle Null or Undefined Values

```typescript
c(null).nullable().get(); // null
c(null).undefined().get(); // undefined
c(null).default("fallback").get(); // "fallback"
```

### Transform Value with a Custom Function

```typescript
c(2)
  .transform((x) => x * 2)
  .get(); // 4
```

### Compare Values

```typescript
c(10).equal(10).get(); // true
c("hello").equal("world").get(); // false
```

## Repository

Find the full source code and contribute on GitHub:

[GitHub Repository](https://github.com/amindasoomi1/castium)

## License

**MIT License**
