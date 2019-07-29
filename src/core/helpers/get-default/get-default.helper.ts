import * as R from 'ramda';
import { DEFAULT_TYPES } from '../../models/default-types.models';

export const getDefault = (type: any) =>
  R.when<any, any>(
    R.complement(R.is(type)),
    R.always(R.propOr(null, String(type.name), DEFAULT_TYPES)),
  );
