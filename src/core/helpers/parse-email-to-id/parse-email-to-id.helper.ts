import * as R from 'ramda';

export const parseEmailToId: (email: string) => string = R.pipe(
  R.split('.'),
  R.join('_'),
);
