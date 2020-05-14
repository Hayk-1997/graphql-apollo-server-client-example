const ITEMS = [
  {
    id: 1,
    name: 'Test Item',
    desc: 'This is a test item',
    ownerId: 234
  },
  {
    id: 2,
    name: 'Test Item 2',
    desc: 'This is a test item 2',
    ownerId: 234
  }
];

export function getItem (id) {
  let target = null;

  ITEMS.some((item) => {
    if (item.id === id) {
      target = item;
      return true
    }
  });

  return target
}

export function getItems () {
  return ITEMS
}

export function getUser () {
  return {
    id: 234,
    username: 'test'
  }
}

export function addNewItem ({ name, desc, ownerId }) {
  const item = {
    id: (ITEMS.length + 1),
    name,
    desc,
    ownerId
  };

  ITEMS.push(item);

  return item
}


export function updateItem ({ name, desc, ownerId }) {
  //
}

export function deleteItem ({ id }) {
  let target = null;
  ITEMS.some((item) => {
    if (item.id !== id) {
      target = item;
      return true
    }
  });
  return target;
}