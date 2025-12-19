export class Queue<T> {
  private data: T[] = [];
  private head = 0;

  enqueue(item: T) {
    this.data.push(item);
  }

  dequeue(): T | undefined {
    return this.data[this.head++];
  }

  length(): number {
    return this.data.length - this.head;
  }

  isEmpty(): boolean {
    return this.length() === 0;
  }
}
