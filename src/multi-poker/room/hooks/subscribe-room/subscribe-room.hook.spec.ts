import { pokers } from '@core/constants';
import { testHook } from '@test-utils/test-hook';
import { USER_ROLE } from '@core/models';
import { useSubscribeRoom } from './subscribe-room.hook';

describe('useSubscribeRoom', () => {
  let hook: any;
  const room: any = {
    id: 1,
    name: 'room-1',
    description: 'this is room number 1',
    poker: pokers[0],
    users: [
      {
        email: 'test@example1.com',
      },
      {
        email: 'test@example2.com',
      },
    ],
    discovered: false,
  };
  const user: any = {
    email: 'test@example.com',
    id: '1234',
    selectedValue: false,
    role: USER_ROLE.ADMIN
  };
  const navigation: any = {
    navigate: jest.fn(),
    setParams: jest.fn(),
  };
  const jiraAccountId = 'id';
  const addUser = jest.fn();
  const setRoom = jest.fn();
  const setEditingRoom = jest.fn();
  const forceQuitRoom = jest.fn();

  describe('when useSubscribeRoom was called', () => {
    beforeEach(() => {
      testHook(() => {
        hook = useSubscribeRoom(room, user, jiraAccountId, navigation)(addUser, setRoom, setEditingRoom, forceQuitRoom);
      });
    });

    it('should empty users array at the beginning', () => {
      const users = hook;

      expect(users)
        .toEqual([]);
    });
  });
});
