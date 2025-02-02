class Castium<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  number<D extends number | null>(defaultValue?: D): Castium<number | D> {
    const newValue = Number(this.value);
    return new Castium(
      isNaN(newValue) ? defaultValue ?? (null as D) : newValue
    );
  }

  string(): Castium<string> {
    return new Castium(String(this.value ?? ""));
  }

  boolean(): Castium<boolean> {
    return new Castium(Boolean(this.value));
  }

  date(): Castium<Date | null> {
    const parsedDate = new Date(this.value as any);
    return new Castium(isNaN(parsedDate.getTime()) ? null : parsedDate);
  }

  isoDate(): Castium<string | null> {
    const dateCaster = this.date();
    return dateCaster.get()
      ? new Castium(dateCaster.get()!.toISOString())
      : new Castium(null);
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
    try {
      const parsed = Array.isArray(this.value)
        ? this.value
        : JSON.parse(String(this.value));
      return new Castium(Array.isArray(parsed) ? parsed : null);
    } catch {
      return new Castium(null);
    }
  }

  object(): Castium<object | null> {
    try {
      const parsed =
        typeof this.value === "object"
          ? this.value
          : JSON.parse(String(this.value));
      return new Castium(
        Array.isArray(parsed) || parsed === null ? null : parsed
      );
    } catch {
      return new Castium(null);
    }
  }

  nullable(): Castium<T | null> {
    return new Castium(
      this.value === "" || this.value === null || this.value === undefined
        ? null
        : this.value
    );
  }

  undefined(): Castium<T | undefined> {
    return new Castium(
      this.value === "" || this.value === null ? undefined : this.value
    );
  }

  default<U>(defaultValue: U): Castium<T | U> {
    return new Castium(
      this.value === "" || this.value === null || this.value === undefined
        ? defaultValue
        : this.value
    );
  }

  transform<U>(fn: (value: T) => U): Castium<U> {
    try {
      return new Castium(fn(this.value));
    } catch {
      return new Castium(null as any);
    }
  }

  get(): T {
    return this.value;
  }
}

const c = <T>(value: T): Castium<T> => new Castium(value);

export { c };
