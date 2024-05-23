export abstract class Transform<T> {
  abstract transform(item: T);

  transformCollection<R>(items: T[]): R[] {
    return items.map((item) => this.transform(item));
  }
}
