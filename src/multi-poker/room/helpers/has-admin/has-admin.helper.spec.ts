import { hasAdmin } from './has-admin.helper';

describe('when hasAdmin was called', () => {
  it('should check if if given email fit to admin user with activated Jira account', () => {
    const users: any = {
      'test_vom_test@test_com': { email: 'test.vom.test@test.com', role: 'admin' },
      'test_vom_test2@test_com': { email: 'test.vom.test2@test.com', role: 'user' },
    };

    expect(hasAdmin('test.vom.test@test.com', users, 'some-jira-id'))
      .toBeTruthy();
    expect(hasAdmin('test.vom.test2@test.com', users, 'some-jira-id'))
      .toBeFalsy();
    expect(hasAdmin('test.vom.test@test.com', users, ''))
      .toBeFalsy();
    expect(hasAdmin('test.vom.test2@test.com', users, 'jira-id'))
      .toBeFalsy();
  });

  it('should always return false if no users are provided', () => {
    const users: any = undefined;

    expect(hasAdmin('test@example.com', users, 'jira-id'))
      .toBeFalsy();
  });
});
