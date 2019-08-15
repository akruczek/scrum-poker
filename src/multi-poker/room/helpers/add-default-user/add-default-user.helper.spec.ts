import { addDefaultUser } from './add-default-user.helper';
import { getNewUser } from '../get-new-user/get-new-user.helper';

describe('when addDefaultUser was called', () => {
  const addUser = jest.fn();
  const user: any = { email: 'test1@example.com' };

  describe('and given user exist in given room users list', () => {
    const room: any = {
      users: {
        'test1@example_com': {
          email: 'test1@example.com',
        },
      },
    };

    beforeEach(() => {
      addDefaultUser(user, room)(addUser);
    });

    it('should do nothing', () => {
      expect(addUser)
        .not.toHaveBeenCalled();
    });
  });

  describe('and given user does not exist in given room users list', () => {
    const room: any = {
      users: {
        'test@example_com': {
          email: 'test@example.com',
        },
      },
    };

    beforeEach(() => {
      addDefaultUser(user, room)(addUser);
    });

    it('should call addUser with getNewUser(user, room) payload', () => {
      expect(addUser)
        .toHaveBeenCalledWith(getNewUser(user, room));
    });
  });

  describe('and given room users list is undefined', () => {
    const room: any = {
      users: undefined,
    };

    beforeEach(() => {
      addDefaultUser(user, room)(addUser);
    });

    it('should call addUser with getNewUser(user, room) payload', () => {
      expect(addUser)
        .toHaveBeenCalledWith(getNewUser(user, room));
    });
  });
});
