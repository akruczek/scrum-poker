import { parseEmailToName } from './parse-email-to-name.helper';

describe('when parseEmailToName was called', () => {
  it('should return email content before "@" with spaces', () => {
    expect(parseEmailToName('test.von_test-2+1@example.com'))
      .toEqual('test von test 2 1');
  });
});
