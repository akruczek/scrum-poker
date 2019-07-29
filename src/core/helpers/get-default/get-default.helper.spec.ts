import { getDefault } from './get-default.helper';

describe('when getDefault was called', () => {
  describe('and given type exist in DEFAULT_TYPES constant', () => {
    describe('and given value type equals given type', () => {
      it('should return given value', () => {
        const value = 'hello';

        expect(getDefault(String)(value))
          .toEqual(value);
      });
    });

    describe('and given value type does not equals given type', () => {
      it('should return default value for given type', () => {
        const value = 120;

        expect(getDefault(String)(value))
          .toEqual('');
      });
    });
  });

  describe('and given type does not exist in DEFAULT_TYPES constant', () => {
    describe('and given value type equals given type', () => {
      it('should return given value', () => {
        const value = 'world';

        expect(getDefault(String)(value))
          .toEqual(value);
      });
    });

    describe('and given value type does not equals given type', () => {
      it('should return null', () => {
        const value = 120;

        expect(getDefault(Array)(value))
          .toBe(null);
      });
    });
  });
});
