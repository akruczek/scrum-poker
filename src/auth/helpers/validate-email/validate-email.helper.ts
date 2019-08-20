import * as R from 'ramda';

export const validateEmail =
  R.test(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);
