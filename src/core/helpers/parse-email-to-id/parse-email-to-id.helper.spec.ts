import { parseEmailToId } from './parse-email-to-id.helper';

describe('when parseEmailToId was called', () => {
  it('should return given email with replaced "." with "_"', () => {
    expect(parseEmailToId('test.von.test@example.com'))
      .toEqual('test_von_test@example_com');
  });
});
