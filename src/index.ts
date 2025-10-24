class Castium<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  number<D extends number | null>(defaultValue?: D): Castium<number | D> {
    let strValue = this.string().get();
    strValue = strValue
      .replace(/[۰۱۲۳۴۵۶۷۸۹۰۱۲۳٤٥٦۷۸۹]/g, (d) => String(d.charCodeAt(0) & 0x0f))
      .replace(/[^0-9.-]/g, "");

    if (
      strValue.indexOf(".") !== strValue.lastIndexOf(".") ||
      strValue === "" ||
      strValue === null ||
      strValue === undefined
    ) {
      return new Castium(defaultValue ?? (null as D));
    }

    const newValue = Number(strValue);
    return new Castium(
      isNaN(newValue) ? defaultValue ?? (null as D) : newValue
    );
  }

  string(): Castium<string> {
    if (this.value === null || this.value === undefined) return new Castium("");
    if (typeof this.value === "object")
      return new Castium(JSON.stringify(this.value));
    return new Castium(String(this.value).trim());
  }

  boolean(): Castium<boolean> {
    return new Castium(Boolean(this.value));
  }

  isEqual(expected: T): Castium<boolean> {
    return new Castium(this.value === expected);
  }

  booleanString(): Castium<boolean | null> {
    const str = this.string().get().toLowerCase();
    if (str === "true") return new Castium(true);
    if (str === "false") return new Castium(false);
    return new Castium(null);
  }

  date(): Castium<Date | null> {
    if (this.value === "" || this.value === null || this.value === undefined)
      return new Castium(null);
    const parsedDate = new Date(this.value as any);
    return new Castium(isNaN(parsedDate.getTime()) ? null : parsedDate);
  }

  isoDate(): Castium<string | null> {
    const dateValue = this.date().get();
    return dateValue ? new Castium(dateValue.toISOString()) : new Castium(null);
  }

  fromDate(): Castium<Date | null> {
    const dateCaster = this.date();
    if (dateCaster.get()) {
      dateCaster.get()!.setHours(0, 0, 0, 0);
    }
    return dateCaster;
  }

  toDate(): Castium<Date | null> {
    const dateCaster = this.date();
    if (dateCaster.get()) {
      dateCaster.get()!.setHours(23, 59, 59, 999);
    }
    return dateCaster;
  }

  dateTime(): Castium<number | null> {
    const dateCaster = this.date();
    return dateCaster.get()
      ? new Castium(dateCaster.get()!.getTime())
      : new Castium(null);
  }

  array(): Castium<any[] | null> {
    if (Array.isArray(this.value)) return new Castium(this.value);
    if (typeof this.value === "string") {
      try {
        const parsed = JSON.parse(this.value);
        return new Castium(Array.isArray(parsed) ? parsed : null);
      } catch {
        return new Castium(null);
      }
    }
    // If not an array and not a string that can be parsed into an array, return null
    return new Castium(null);
  }

  object(): Castium<object | null> {
    if (
      typeof this.value === "object" &&
      !Array.isArray(this.value) &&
      this.value !== null
    ) {
      return new Castium(this.value);
    }
    if (typeof this.value === "string") {
      try {
        const parsed = JSON.parse(this.value);
        return new Castium(
          typeof parsed === "object" &&
          parsed !== null &&
          !Array.isArray(parsed)
            ? parsed
            : null
        );
      } catch {
        return new Castium(null);
      }
    }
    // If not an object and not a string that can be parsed into an object, return null
    return new Castium(null);
  }

  nullable(): Castium<T | null> {
    return new Castium(
      this.value === "" || this.value === undefined ? null : this.value
    );
  }

  undefined(): Castium<T | undefined> {
    return new Castium(
      this.value === "" || this.value === null ? undefined : this.value
    );
  }

  default<U>(defaultValue: U): Castium<U | Exclude<T, null | undefined>> {
    const value = this.get();
    return new Castium(
      value === null || value === undefined
        ? defaultValue
        : (value as Exclude<T, null | undefined>)
    );
  }

  transform<U>(fn: (value: T) => U, defaultValue?: U): Castium<U | null> {
    try {
      return new Castium(fn(this.value));
    } catch {
      return new Castium(defaultValue ?? null);
    }
  }

  json(): Castium<object | null> {
    try {
      return new Castium(JSON.parse(this.string().get()));
    } catch {
      return new Castium(null);
    }
  }

  match(regex: RegExp): Castium<boolean> {
    const str = this.string().get();
    return new Castium(regex.test(str));
  }

  oneOf(...values: (T | T[])[]): Castium<boolean> {
    const validValues = values.flat();
    return new Castium(validValues.includes(this.value));
  }

  clamp(min: number, max: number): Castium<number> {
    const num = this.number().get();
    if (num === null) return new Castium(min);
    return new Castium(Math.min(Math.max(num, min), max));
  }

  enum<E>(enumObj: Record<string, E>): Castium<E | null> {
    const values = Object.values(enumObj);
    const value = this.get() as unknown as E;
    const includes = values.includes(value);
    return new Castium(includes ? value : null);
  }

  get(): T {
    return this.value;
  }
}

const c = <T>(value: T): Castium<T> => new Castium(value);

export { c };
