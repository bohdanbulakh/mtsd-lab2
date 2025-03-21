import { ListInterface } from './list.interface.js';

export class List implements ListInterface {
  private array: string[] = [];

  length (): number {
    return this.array.length;
  }

  append (item: string): void {
    this.array.push(item);
  }

  insert (item: string, index: number): void {
    this.checkIndex(index);

    const right = this.array.splice(index);
    this.array = [...this.array, item, ...right];
  }

  delete (index: number): string {
    this.checkIndex(index);
    const value = this.array[index];

    this.array.splice(index, 1);
    return value;
  }

  deleteAll (item: string): void {
    for (const [index, elem] of this.array.entries()) {
      if (item === elem) {
        this.array.splice(index, 1);
      }
    }
  }

  get (index: number): string {
    this.checkIndex(index);
    return this.array[index];
  }

  clone (): List {
    const newList = new List();
    for (const item of this.array) {
      newList.append(item);
    }

    return newList;
  }

  reverse (): void {
    this.array = this.array.reverse();
  }

  findFirst (item: string): number {
    return this.array.findIndex((element) => element === item);
  }

  findLast (item: string): number {
    return this.array.lastIndexOf(item);
  }

  clear (): void {
    this.array = [];
  }

  extend (items: List): void {
    const clone = items.clone();
    this.array.push(...clone.array);
  }

  private checkIndex (index: number): void {
    if (index < 0 || index >= this.array.length) {
      throw new Error('Invalid index');
    }
  }
}
