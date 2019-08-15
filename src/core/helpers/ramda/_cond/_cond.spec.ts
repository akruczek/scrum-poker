import * as R from 'ramda';
import { _cond } from './_cond';

describe('when _cond was called', () => {
  
  it('should return nth+1 value when first nth condition passed', () => {
    expect(
      _cond(
        false, 'red!',
        true, 'yellow!',
        false, 'green!',
        R.T, 'black!',
      )
    ).toEqual('yellow!');

    expect(
      _cond(
        false, 'red!',
        false, 'yellow!',
        false, 'green!',
        R.T, 'black!',
      )
    ).toEqual('black!');
  });
});
