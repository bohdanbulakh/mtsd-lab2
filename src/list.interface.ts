export interface ListInterface {
  length(): number;
  append(item: string): void;
  insert(item: string, index: number): void;
  delete(index: number): string;
  deleteAll(item: string): void;
  get(index: number): string;
  clone(): ListInterface;
  reverse(): void;
  findFirst(item: string): number;
  findLast(item: string): number;
  clear(): void;
  extend(items: ListInterface): void;
}
