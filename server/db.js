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
    if (parseInt(item.id) === parseInt(id)) {
      target = item;
      return true;
    }
  });

  return target;
}

export function getItems () {
  return ITEMS;
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

  return item;
}


export function updateItem ({ name, desc, id }) {
  const findIndex = ITEMS.findIndex((item) => parseInt(item.id) === parseInt(id));
  ITEMS[findIndex].name = name;
  ITEMS[findIndex].desc = desc;

  return {
    id: id,
    name: name,
    desc: desc,
  }
}

export function deleteItem ({ id }) {
  const findIndex = ITEMS.findIndex((item) => parseInt(item.id) === parseInt(id));
  ITEMS.splice(findIndex, 1);

  return ITEMS;
}