import { isRiskCard } from './is-risk-card.helper';

describe('when isRiskCard was called', () => {
  describe('and given argument is typeof string and includes "risk"', () => {
    it('should return true', () => {
      expect(isRiskCard('risk-red'))
        .toBeTruthy();
    });
  });
  
  describe('and given argument is not typeof string or does not contain "risk"', () => {
    it('should return false', () => {
      expect(isRiskCard(() => null))
        .toBeFalsy();
      expect(isRiskCard('hello'))
        .toBeFalsy();
    });
  });
});
