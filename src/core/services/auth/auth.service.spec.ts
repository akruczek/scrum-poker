import { AuthService } from './auth.service';
import { Storage } from '../device-storage/device-storage.service';

describe('AuthService', () => {
  describe('when AuthService.initialize was called', () => {
    beforeEach(() => {
      spyOn(Storage, 'get').and.returnValue(new Promise(() => {}));
      AuthService.initialize();
    });

    it('should call Storage.get function', () => {
      expect(Storage.get)
        .toHaveBeenCalled();
    });
  });
});
