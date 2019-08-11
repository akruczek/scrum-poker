import * as R from 'ramda';

export const parseJiraAuthData = R.pipe<any, any, any, any>(
  R.fromPairs,
  R.values,
  R.zipObj([ 'spaceName', 'email', 'token' ]),
);
