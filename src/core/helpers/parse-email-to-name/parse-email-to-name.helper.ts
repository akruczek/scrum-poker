import * as R from 'ramda';

export const parseEmailToName = R.pipe<string, string[], string, string>(
  R.split('@'),
  R.head,
  R.replace(/(\.|_|-|\+)/g, ' '),
);
