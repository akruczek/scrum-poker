import * as R from 'ramda';

export const parseBriiskName = R.when(
  R.includes('@briisk.co'),
  R.pipe(
    R.split('@') as any,
    R.head,
    R.split('.') as any,
    R.map((word: string[]) => `${R.toUpper(word[0])}${R.drop(1, word)}`),
    R.join(' '),
  ),
);
