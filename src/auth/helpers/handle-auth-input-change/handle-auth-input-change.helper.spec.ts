import { handleAuthInputChange } from './handle-auth-input-change.helper';

describe('when handleAuthInputChange was called', () => {
  const setEmail = jest.fn();
  const throwError = jest.fn();

  beforeEach(() => {
    handleAuthInputChange('test@example.com')(setEmail, throwError);
  });

  it('should call throwError with empty string and setEmail with given email', () => {
    expect(setEmail)
      .toHaveBeenCalledWith('test@example.com');
    expect(throwError)
      .toHaveBeenCalledWith('');
  });
});
