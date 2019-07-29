import * as R from 'ramda';
import { isNotEmpty } from '../is-not-empty/is-not-empty.helper';

export const rejectNil: any = R.when(
  isNotEmpty,
  R.reject(R.isNil),
);
