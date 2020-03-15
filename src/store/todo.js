import nanoid from 'nanoid/non-secure';

const newItem = (text) => {
  return {
    id: nanoid(16),
    text,
    isEdit: false,
  };
};

export const todo = ({ dispatch, on }) => {
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

  on('items/@change', ({ items }, { id, ...data }) => {
    const index = items.findIndex((i) => i.id === id);

    items.splice(index, 1, { ...items[index], ...data });

    return {
      items: [...items],
    };
  });

  on('items/openEdit', (_, id) => {
    dispatch('items/@change', {
      id,
      isEdit: true,
    });
  });

  on('items/closeEdit', (_, id) => {
    dispatch('items/@change', {
      id,
      isEdit: false,
    });
  });

  on('items/update', (_, { id, text }) => {
    dispatch('items/@change', {
      id,
      text,
      isEdit: false,
    });
  });
};
