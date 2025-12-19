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
