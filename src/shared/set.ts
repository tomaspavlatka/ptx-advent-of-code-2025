export class CustomSet<T> {
  private items: Map<string, T> = new Map();
  private getKey: (item: T) => string;

  constructor(getKey: (item: T) => string) {
    this.getKey = getKey;
  }

  add(item: T): void {
    this.items.set(this.getKey(item), item);
  }

  delete(item: T): void {
    this.items.delete(this.getKey(item));
  }

  has(item: T): boolean {
    return this.items.has(this.getKey(item));
  }

  values (): T[] {
    return [...this.items.values()];
  }

  size (): number {
    return this.items.size;
  }
}

export const symmetricDiff = function<T>(a: Set<T>, b: Set<T>): Set<T> {
  const result = new Set<T>();

  for (const x of a) {
    if (!b.has(x)) result.add(x);
  }

  for (const x of b) {
    if (!a.has(x)) result.add(x);
  }

  return result;
}

export const equals = function<T>(a: Set<T>, b: Set<T>): boolean {
  if (a.size != b.size) {
    return false;
  }

  for (const x of a) {
    if (!b.has(x)) {
      return false;
    }
  }

  return true;
}

