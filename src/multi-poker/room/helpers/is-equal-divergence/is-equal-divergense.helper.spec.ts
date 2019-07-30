import { isEqualDivergence } from './is-equal-divergence.helper';

describe('when isEqualDivergence was called', () => {
  it('should return false if given value equals one of divergences of given array', () => {
    expect(isEqualDivergence(1)([ 1, 2, 3 ]))
      .toBeTruthy();
  });

  it('should return true if given value does not equals any of divergences of given array', () => {
    expect(isEqualDivergence(2)([ 1, 2, 3 ]))
      .toBeFalsy();
  });
});
