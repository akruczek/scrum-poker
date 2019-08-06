import { getNewUser } from './get-new-user.helper';
import { USER_ROLE } from '../../../../core/models/user.models';

describe('when getNewUser was called', () => {
  const rooms: any = [
    {
      id: 0,
      name: 'Super Room 1',
      users: [
        {
          email: 'test@example.com',
          role: 'admin',
        },
        {
          email: 'test1@example.com',
          role: 'user',
        },
      ],
    },
    {
      id: 1,
      name: 'My Awesome Room',
      users: [
        {
          email: 'test@example.com',
          role: 'admin',
        },
        {
          email: 'test1@example.com',
          role: 'user',
        },
      ],
    },
  ];

  
  it('should return new user object created based on given data', () => {
    const user: any = {
      email: 'test@example.com',
    };
    const room: any = {
      id: 0,
      name: 'Super Room 1',
    };

    const expectedResult = {
      user: {
        email: 'test@example.com',
        role: 'user',
      },
      index: 0,
      roomIndex: 0,
    };

    expect(getNewUser(user, room, rooms))
      .toEqual(expectedResult);
  });

  it('should return user with role admin if given room users list is empty or isAllAdmin flag is true', () => {
    const user: any = {
      email: 'test@example.com',
    };
    const room: any = {
      allAdmins: true,
      id: 1,
      name: 'My Awesome Room',
    };
    expect(getNewUser(user, room, rooms).user.role)
      .toEqual(USER_ROLE.ADMIN);
  });
});
