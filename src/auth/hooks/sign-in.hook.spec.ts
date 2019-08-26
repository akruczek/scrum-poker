import { act } from 'react-test-renderer';
import { testHook } from '@test-utils/test-hook';
import { useSignIn } from './sign-in.hook';

describe('useSignIn', () => {
  const signIn = jest.fn();
  let hook: any;

  describe('when useSignIn hook was called', () => {
    beforeEach(() => {
      testHook(() => {
        hook = useSignIn(signIn);
      });
    });
    
    it('should return empty email and error at the beginning', () => {
      const [ email, error ] = hook;

      expect(email)
        .toEqual('');
      expect(error)
        .toEqual('');
    });

    it('should have an handleSignIn and handleChange methods', () => {
      const [ _, __, handleSignIn, handleChange ] = hook;

      expect(handleSignIn)
        .toBeInstanceOf(Function);
      expect(handleChange)
        .toBeInstanceOf(Function);
    });

    describe('when handleSignIn was called', () => {
      beforeEach(() => {
        const [ _, __, handleSignIn ] = hook;

        act(() => {
          handleSignIn('test@example.com');
        });
      });

      it('should call signIn when email match email pattern', () => {
        expect(signIn)
          .toHaveBeenCalledWith('test@example.com');
      });
    });
  });
});
