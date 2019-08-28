import { act } from 'react-test-renderer';
import { testHook } from '@test-utils/test-hook';
import { pokers } from '@core/constants';
import { useCreateRoom } from './create-room.hook';
import { prepareNewRoom } from '../../helpers/prepare-new-room/prepare-new-room.helper';

describe('useCreateRoom', () => {
  const addRoom = jest.fn();
  const setRoom = jest.fn();
  const navigate = jest.fn();
  const room = {
    id: 'id',
    name: 'name',
    description: 'string',
    users: {},
    discovered: false,
    allAdmins: true,
    poker: pokers[0],
    projectKey: 'XX',
    customField: 'customfield_10021',
    defaultIssueType: 'Story',
    defaultIssueStatus: 'To Do',
  };
  let hook: any;

  describe('when useCreateRoom hook was called', () => {
    beforeEach(() => {
      testHook(() => {
        hook = useCreateRoom(addRoom, setRoom, navigate);
      });
    });

    it('should return handleNavigate and handleAddRoom room methods', () => {
      const [ _, __, handleNavigate, handleAddRoom ] = hook;

      expect(handleNavigate)
        .toBeInstanceOf(Function);
      expect(handleAddRoom)
        .toBeInstanceOf(Function);
    });

    it('should return "false" setCreateRoom at the beginning', () => {
      const [ isCreatingRoom ] = hook;

      expect(isCreatingRoom)
        .toBeFalsy();
    });

    it('should change setCreateRoom to "true" after call setCreateRoom with "true"', () => {
      const [ _, setCreateRoom ] = hook;

      act(() => {
        setCreateRoom(true);
      });

      const [ isCreatingRoom ] = hook;

      expect(isCreatingRoom)
        .toBeTruthy();
    });

    it('should call setCreateRoom, addRoom and handleNavigate with given room after call handleAddRoom method', () => {
      const [ _, __, ___, handleAddRoom ] = hook;

      act(() => {
        handleAddRoom(room);
      });

      expect(addRoom)
        .toHaveBeenCalledWith(prepareNewRoom(room));
    });
  });
});
