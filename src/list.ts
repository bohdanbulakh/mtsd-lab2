import { ListInterface } from './list.interface.js';

class Node {
  next?: Node;
  prev?: Node;

  constructor (public value: string) {}
}

export class List implements ListInterface {
  head?: Node;

  length (): number {
    let length = 0;
    let currentNode = this.head;

    while (currentNode) {
      currentNode = currentNode?.next;
      length++;
    }

    return length;
  }

  append (item: string): void {
    const newNode = new Node(item);
    const last = this.getLast();

    if (last) {
      last.next = newNode;
    } else {
      this.head = newNode;
    }
  }

  insert (item: string, index: number): void {
    const current = this.getNode(index);
    const prev = current?.prev;

    const newNode = new Node(item);
    newNode.next = current;
    newNode.prev = prev;

    if (current) current.prev = newNode;
    if (prev) prev.next = current;
  }

  delete (index: number): string {
    const node = this.getNode(index);
    const value = node.value;
    this.removeNode(node);

    return value;
  }

  deleteAll (item: string): void {
    let current = this.head;

    while (current) {
      if (item === current.value)
        this.removeNode(current);

      current = current.next;
    }
  }

  get (index: number): string {
    return this.getNode(index).value;
  }

  clone (): List {
    const newList = new List();

    for (
      let current = this.head;
      current;
      current = current.next
    ) {
      newList.append(current.value);
    }

    return newList;
  }

  reverse (): void {
    const newHead = this.getLast();

    for (
      let current = newHead;
      current;
      current = current.prev
    ) {
      const prev = current.prev
      current.prev = current.next;
      current.next = prev;
    }

    this.head = newHead;
  }

  findFirst (item: string): number {
    for (
      let index = 0, current = this.head;
      current;
      current = current.next
    ) {
      if (current.value === item) return index;
    }

    return -1;
  }

  findLast (item: string): number {
    for (
      let index = 0, current = this.getLast();
      current;
      current = current.prev
    ) {
      if (current.value === item) return index;
    }

    return -1;
  }

  clear (): void {
    this.head = undefined;
  }

  extend (items: List): void {
    const clone = items.clone();
    const last = this.getLast();

    if (last) last.next = clone.head
    if (clone.head) clone.head.prev = last
  }

  private checkIndex (index: number): void {
    if (index < 0 || index > this.length()) {
      throw new Error('Invalid index');
    }
  }

  private getNode (index: number): Node {
    this.checkIndex(index);

    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current?.next;
    }

    return current as Node;
  }

  private getLast (): Node | undefined {
    let last = this.head;
    while (last?.next) {
      last = last?.next;
    }

    return last;
  }

  private removeNode (node: Node): void {
    const next = node?.next;
    const prev = node?.prev;

    if (prev) prev.next = next;
    if (next) next.prev = prev;
  }
}
