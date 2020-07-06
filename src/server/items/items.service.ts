import { Item } from './item.interface';
import { Items } from './items.interface';

const items: Items = {
  1: {
    id: 1,
    name: 'Burger',
    price: 5.99,
    description: 'Tasty',
    image: 'https://cdn.auth0.com/blog/whatabyte/burger-sm.png',
  },
  2: {
    id: 2,
    name: 'Pizza',
    price: 2.99,
    description: 'Cheesy',
    image: 'https://cdn.auth0.com/blog/whatabyte/pizza-sm.png',
  },
  3: {
    id: 3,
    name: 'Tea',
    price: 1.99,
    description: 'Informative',
    image: 'https://cdn.auth0.com/blog/whatabyte/tea-sm.png',
  },
};

export const getItemList = async (): Promise<Items> => items;

export const getItem = async (id: number): Promise<Item> => {
  const record: Item = items[id];

  if (record) {
    return record;
  }

  throw new Error('No record found');
};

export const createItem = async (newItem: Item): Promise<Items> => {
  const id = new Date().valueOf();
  items[id] = {
    ...newItem,
    id,
  };
  return items;
};

export const updateItem = async (updatedItem: Item): Promise<Items> => {
  if (items[updatedItem.id]) {
    items[updatedItem.id] = updatedItem;
    return items;
  }

  throw new Error('No record found to update');
};

export const removeItem = async (id: number): Promise<Items> => {
  const record: Item = items[id];

  if (record) {
    delete items[id];
    return items;
  }

  throw new Error('No record found to delete');
};
