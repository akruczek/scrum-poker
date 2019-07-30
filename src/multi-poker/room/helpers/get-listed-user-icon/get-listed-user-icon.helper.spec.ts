import { getListedUserIcon } from './get-listed-user-icon.helper';

describe('when getListedUserIcon was called', () => {
  describe('and first argument is false', () => {
    it('should return "live-help"', () => {
      expect(getListedUserIcon(false, true, true))
        .toEqual('live-help');
    });
  });

  describe('and first argument is true', () => {
    describe('and all other argument are false', () => {
      it('should return "check"', () => {
        expect(getListedUserIcon(true, false, false))
          .toEqual('check');
      });
    });

    describe('and any of other arguments is true', () => {
      it('should return "help"', () => {
        expect(getListedUserIcon(true, false, true))
          .toEqual('help');
      });
    });
  });
});
