import { testHook } from '@test-utils/test-hook';
import { useSubscribeRooms } from './subscribe-rooms.hook';

describe('useSubscribeRoom', () => {
  const setRooms = jest.fn();
  let hook: any;

  describe('when useSubscribeRoom hook was called', () => {
    beforeEach(() => {
      testHook(() => {
        hook = useSubscribeRooms(setRooms);
      });
    });

    it('should return "false" isPending at the beginning', () => {
      const [ isPending ] = hook;

      expect(isPending)
        .toBeFalsy();
    });
  });
});