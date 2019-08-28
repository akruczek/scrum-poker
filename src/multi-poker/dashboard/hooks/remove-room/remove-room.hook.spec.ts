import { testHook } from '@test-utils/test-hook';
import { useRemoveRoom } from './remove-room.hook';
import { act } from 'react-test-renderer';

describe('useRemoveRoom', () => {
  const removeRoom = jest.fn();
  let hook: any;

  describe('when useRemoveRoom hook was called', () => {
    beforeEach(() => {
      testHook(() => {
        hook = useRemoveRoom(removeRoom);
      });
    });

    it('should return "false" isSwiping at the beginning', () => {
      const [ isSwiping ] = hook;

      expect(isSwiping)
        .toBeFalsy();
    });

    it('should return "true" isSwiping after call setSwiping with "true"', () => {
      const [ _, setSwiping ] = hook;

      act(() => {
        setSwiping(true);
      });

      const [ isSwiping ] = hook;

      expect(isSwiping)
        .toBeTruthy();
    });

    it('should call removeRoom with passed room id after call handleRemoveRoom method', () => {
      const [ _, __, handleRemoveRoom ] = hook;

      act(() => {
        handleRemoveRoom({ id: '1234' });
      });

      expect(removeRoom)
        .toHaveBeenCalledWith('1234');
    });
  });
});
