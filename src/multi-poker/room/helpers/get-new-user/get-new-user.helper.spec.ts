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
      roomId: 0,
      user: {
        email: 'test@example.com',
        role: 'admin',
        id: 'test@example_com',
      },
    };

    expect(getNewUser(user, room))
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

    const oneAdminRoom: any = {
      allAdmins: false,
      id: 1,
      name: 'One Admin room',
      users: [
        { id: 'some-id', email: 'some@email.test' },
      ],
    };

    expect(getNewUser(user, room).user.role)
      .toEqual(USER_ROLE.ADMIN);
    expect(getNewUser(user, oneAdminRoom).user.role)
      .toEqual(USER_ROLE.USER);
  });
});
