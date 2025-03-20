import { List } from '../src/list';

describe('List', () => {
  let list: List;

  beforeEach(() => {
    list = new List();
  });

  describe('length', () => {
    it('should be 0 if no elements were added to list', () => {
      expect(list.length()).toBe(0);
    });

    it('should be not 0', () => {
      const items = ['test1', 'test2', 'test3', 'test4', 'test5'];
      for (const item of items) {
        list.append(item);
      }

      expect(list.length()).toBe(items.length);
    });
  });

  describe('append', () => {
    it('should add element at the end of the list', () => {
      list.append('test');
      const item = list.get(list.length() - 1);

      expect(list.length()).toBe(1);
      expect(item).toBe('test');
    });

    it('should add elements to the list', () => {
      const items = ['test1', 'test2', 'test3', 'test4'];
      for (const item of items) {
        list.append(item);
      }

      expect(list.length()).toBe(items.length);
    });
  });

  describe('insert', () => {
    const items = ['item1', 'item2', 'item3'];

    beforeEach(() => {
      for (const item of items) {
        list.append(item);
      }
    });

    it('should add element in the middle of list', () => {
      const item = 'test';
      list.insert(item, 1);

      const inserted = list.get(1);
      const prev = list.get(0);
      const next = list.get(2);

      expect(inserted).toEqual(item);
      expect(prev).toEqual(items[0]);
      expect(next).toEqual(items[1]);
    });

    it('should add element at the 1st position', () => {
      const item = 'test';
      list.insert(item, 0);

      const inserted = list.get(0);
      const prev = list.get(1);

      expect(inserted).toEqual(item);
      expect(prev).toEqual(items[0]);
    });

    it('should add element at the last position', () => {
      const item = 'test';
      list.insert(item, 2);

      const inserted = list.get(2);
      const prev = list.get(1);
      const next = list.get(3);

      expect(inserted).toEqual(item);
      expect(prev).toEqual(items[1]);
      expect(next).toEqual(items[2]);
    });

    it('should throw an error when index is less than 0', () => {
      const callback = () => list.insert('test', -1);
      expect(callback).toThrow(expect.objectContaining({ message: 'Invalid index' }));
    });

    it('should throw an error when index is grater than element count', () => {
      const length = list.length();
      const callback = () => list.insert('test', length);

      expect(callback).toThrow(expect.objectContaining({ message: 'Invalid index' }));
    });
  });

  describe('delete', () => {
    const items = ['item1', 'item2', 'item3'];

    beforeEach(() => {
      for (const item of items) {
        list.append(item);
      }
    });

    it('should remove element at the beginning of the list', () => {
      const value = list.delete(0);
      expect(value).toEqual(items[0]);

      const item1 = list.get(0);
      expect(item1).toEqual(items[1]);
    });

    it('should remove element in the middle of the list', () => {
      const value = list.delete(1);
      expect(value).toEqual(items[1]);

      const item1 = list.get(0);
      const item2 = list.get(1);

      expect(item1).toEqual(items[0]);
      expect(item2).toEqual(items[2]);
    });

    it('should remove element at the end of the list', () => {
      const value = list.delete(2);
      expect(value).toEqual(items[2]);

      const item1 = list.get(1);
      expect(item1).toEqual(items[1]);
    });

    it('should throw an error when index is less than 0', () => {
      const callback = () => list.delete(-1);
      expect(callback).toThrow(expect.objectContaining({ message: 'Invalid index' }));
    });

    it('should throw an error when index is grater than element count', () => {
      const length = list.length();
      const callback = () => list.delete(length);

      expect(callback).toThrow(expect.objectContaining({ message: 'Invalid index' }));
    });
  });

  describe('deleteAll', () => {
    const items = ['item1', 'item2', 'item1'];

    beforeEach(() => {
      for (const item of items) {
        list.append(item);
      }
    });

    it('should remove all "item1" in the list', () => {
      list.deleteAll('item1');

      expect(list.length()).toEqual(1);
      expect(list.get(0)).toEqual(items[1]);
    });

    it('should not delete any elements if there are no matches in the list', () => {
      list.deleteAll('item5');

      expect(list.length()).toEqual(items.length);
    });
  });

  describe('get', () => {
    const items = ['item1', 'item2', 'item3'];

    beforeEach(() => {
      for (const item of items) {
        list.append(item);
      }
    });


    it('should return item on index', () => {
      const item = list.get(1);
      const prev = list.get(0);
      const next = list.get(2);

      expect(item).toEqual(items[1]);
      expect(prev).toEqual(items[0]);
      expect(next).toEqual(items[2]);
    });

    it('should throw an error when index is less than 0', () => {
      const callback = () => list.get(-1);
      expect(callback).toThrow(expect.objectContaining({ message: 'Invalid index' }));
    });

    it('should throw an error when index is grater than element count', () => {
      const length = list.length();
      const callback = () => list.get(length);

      expect(callback).toThrow(expect.objectContaining({ message: 'Invalid index' }));
    });
  });

  describe('clone', () => {
    const items = ['item1', 'item2', 'item3'];

    beforeEach(() => {
      for (const item of items) {
        list.append(item);
      }
    });

    it('should clone list', () => {
      const newList = list.clone();
      expect(newList).not.toBe(list);

      newList.append('item5');
      expect(newList.length()).not.toEqual(list.length());
    });
  });

  describe('reverse', () => {
    const items = ['item1', 'item2', 'item3', 'item4'];

    beforeEach(() => {
      for (const item of items) {
        list.append(item);
      }
    });

    it('should change order of list elements', () => {
      list.reverse();
      const reversedItems = items.reverse();

      for (const [index, item] of reversedItems.entries()) {
        const value = list.get(index);
        expect(value).toEqual(item);
      }
    });
  });

  describe('findFirst', () => {
    const items = ['item2', 'item1', 'item2', 'item1', 'item3'];
    beforeEach(() => {
      for (const item of items) {
        list.append(item);
      }
    });

    it('should return index of the 1st match', () => {
      const index = list.findFirst('item1');
      expect(index).toEqual(1);
    });

    it('should -1 if no matches were found', () => {
      const index = list.findFirst('item5');
      expect(index).toEqual(-1);
    });
  });

  describe('findLast', () => {
    const items = ['item2', 'item1', 'item2', 'item1', 'item3'];
    beforeEach(() => {
      for (const item of items) {
        list.append(item);
      }
    });

    it('should return index of the last match', () => {
      const index = list.findLast('item1');
      expect(index).toEqual(3);
    });

    it('should -1 if no matches were found', () => {
      const index = list.findLast('item5');
      expect(index).toEqual(-1);
    });
  });

  describe('clear', () => {
    const items = ['item1', 'item2', 'item3'];

    beforeEach(() => {
      for (const item of items) {
        list.append(item);
      }
    });

    it('should remove all array elements', () => {
      list.clear();
      expect(list.length()).toEqual(0);
    });
  });

  describe('extend', () => {
    const items = ['item1', 'item2', 'item3'];

    beforeEach(() => {
      for (const item of items) {
        list.append(item);
      }
    });

    it('should extend list', () => {
      const newList = new List();
      for (const item of ['item5', 'item6']) {
        newList.append(item);
      }

      list.extend(newList);
      newList.append('item7');

      expect(list.length()).toEqual(5);
    });
  });
});
