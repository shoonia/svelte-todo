import nanoid from 'nanoid/non-secure';

const newItem = (text) => {
  return {
    id: nanoid(16),
    text,
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
};
