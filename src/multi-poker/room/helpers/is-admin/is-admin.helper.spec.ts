import { isAdmin } from './is-admin.helper';
import { USER_ROLE } from '../../../../core/models/user.models';

describe('when isAdmin was called', () => {
  const users = [
    { email: 'test@example.com', role: USER_ROLE.ADMIN },
    { email: 'userX@example.com', role: USER_ROLE.USER },
    { email: 'test@von.test.com', role: USER_ROLE.ADMIN },
  ];

  it('should find user by email in given users list and check admin permissions', () => {
    expect(isAdmin('test@example.com')(users))
      .toBeTruthy();
    expect(isAdmin('userX@example.com')(users))
      .toBeFalsy();
  });
});