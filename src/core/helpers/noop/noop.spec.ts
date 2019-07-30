import { NOOP } from './noop';

describe('NOOP', () => {
  describe('when NOOP was called', () => {
    it('should return null', () => {
      expect(NOOP())
        .toBe(null);
    });
  });
});
