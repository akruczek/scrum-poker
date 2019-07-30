import { isDivergence } from './is-divergence.helper';

describe('when isDivergence was called', () => {
  it('should return true if given array contains at least 3 different uniq values', () => {
    expect(isDivergence([ 1, 1, 4, 4, 7, 7, 9 ]))
      .toBeTruthy();
  });

  it('should return false if given array contains less than 3 different uniq values', () => {
    expect(isDivergence([ 1, 1, 4, 4 ]))
      .toBeFalsy();
  });
});
