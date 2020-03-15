import nanoid from 'nanoid/non-secure';

const newItem = (text) => {
  return {
    id: nanoid(16),
    text,
    isEdit: false,
  };
};

export const todo = ({ on }) => {
  on('@init', () => {
    return {
      items: [],
    };
  });

  on('items/add', ({ items }, text) => {
    return {
      items: [newItem(text), ...items],
    };
  });

  on('items/remove', ({ items }, id) => {
    return {
      items: items.filter((i) => i.id !== id),
    };
  });

  on('items/edit', ({ items }, id) => {
    const index = items.findIndex((i) => i.id === id);
    const editItem = { ...items[index], isEdit: true };

    items.splice(index, 1, editItem);

    return {
      items: [...items],
    };
  });

  on('items/update', ({ items }, { id, text }) => {
    const index = items.findIndex((i) => i.id === id);
    const updateItem = { ...items[index], text, isEdit: false };

    items.splice(index, 1, updateItem);

    return {
      items: [...items],
    };
  });
};
