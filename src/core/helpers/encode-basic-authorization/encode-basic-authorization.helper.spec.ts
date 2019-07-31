import { encodeBasicAuthorization } from './encode-basic-authorization.helper';

describe('when encodeBasicAuthorization was called', () => {
  it('should join given arguments with ":" and encode to base64', () => {
    expect(encodeBasicAuthorization('hello', 'world'))
      .toEqual('Basic aGVsbG86d29ybGQ=');
  });
});
