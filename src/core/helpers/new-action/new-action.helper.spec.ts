import { newAction } from './new-action.helper';

describe('when newAction was called', () => {
  describe('and payload was provided', () => {
    it('should return object with given action type and payload', () => {
      const type = '[Action]: Some Action';
      const payload = { id: '1234' };
  
      expect(newAction(type)(payload))
        .toEqual({ type, payload });
    });
  });

  describe('and payload was not provided', () => {
    it('should return object with given type', () => {
      const type = '[Action]: Action';

      expect(newAction(type)())
        .toEqual({ type });
    });
  });
});
