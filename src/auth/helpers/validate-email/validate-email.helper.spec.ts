import { validateEmail } from './validate-email.helper';

describe('when validateEmail was called', () => {
  describe('and given email fit email regexp', () => {
    it('should return true', () => {
      expect(validateEmail('test@example.com'))
        .toBeTruthy();
      expect(validateEmail('testVonTest@o2.com'))
        .toBeTruthy();
    });
  });

  describe('and given email does not fit email regexp', () => {
    it('should return false', () => {
      expect(validateEmail('test.example.com'))
        .toBeFalsy();
      expect(validateEmail(''))
        .toBeFalsy();
    });
  });
});
