import { createStoreon } from 'storeon';
import { storeonDevtools } from 'storeon/devtools';

import { todo } from './todo';

export const store = createStoreon([
  todo,
  process.env.NODE_ENV !== 'production' && storeonDevtools,
]);
