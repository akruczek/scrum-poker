import * as R from 'ramda';
import { UserModel } from '../../../../auth/models/auth.models';
import { RoomModel } from '../../../models/room.models';

export const getEstimation = R.ifElse(
  R.propEq('discovered', true),
  R.pipe<RoomModel, { [key: string]: UserModel }, UserModel[], any[], (number| string)[], number[]>(
    R.prop('users'),
    R.values,
    R.map(
      R.path([ 'selectedValue', 'value' ]),
    ),
    R.filter((v: number) => Number(v) !== NaN),
    R.filter(R.is(Number)),
  ),
  R.always(null),
);
