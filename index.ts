import { List } from './src/list.js';

function main () {
  const list = new List();

  const text = 'Some very important information';
  for (const item of text.split(/\s/)) {
    list.append(item);
  }

  printList(list);

  const length = list.length();
  console.log({ length });

  list.insert('test', 1);
  printList(list);

  list.reverse();
  printList(list);

  list.clear();
  printList(list);

  for (const item of text.split(/\s/)) {
    list.append(item);
  }
  list.append('important');
  list.append('test');

  console.log({
    value: 'important',
    first: list.findFirst('important'),
    last: list.findLast('important'),
  });

  const deleted = list.delete(1);
  console.log({ deleted });
  printList(list);

  list.deleteAll('important');
  printList(list);

  const cloned = list.clone();
  cloned.append('test5');

  console.log('\ncloned:');
  printList(cloned);

  console.log(('\nlist:'));
  printList(list);

  const newList = new List();
  newList.append('test123');

  list.extend(newList);
  newList.append('test567');

  console.log('\nNew list:');
  printList(newList);

  console.log(('\nlist:'));
  printList(list);
}

function printList (list: List) {
  const length = list.length();

  let result = '[';

  for (let i = 0; i < length; i++) {
    const item = list.get(i);

    if (i !== 0) result += ',';
    result += `'${item}'`;
  }

  result += ']';
  console.log(result);
}

main();
