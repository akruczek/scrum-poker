import { AsyncStorage } from 'react-native';
import { Storage } from './device-storage.service';
import { of } from 'rxjs';

describe('Storage', () => {
  const appKey = '@scrum-poker';

  describe('when Storage.set was called', () => {
    const value = 'en';
    const key = 'userLanguage';

    beforeEach(() => {
      spyOn(AsyncStorage, 'setItem');
      Storage.set(key, value);
    });

    it('should set in device storage given value with given key, preceded with @app-name', () => {
      expect(AsyncStorage.setItem)
        .toHaveBeenCalledWith(`${appKey}:${key}`, value);
    });
  });

  describe('when Storage.get was called', () => {
    const key = 'userLanguage';

    beforeEach(() => {
      spyOn(AsyncStorage, 'getItem').and.returnValue(of('pl'));
      Storage.get(key);
    });

    it('should call getItem function of AsyncStorage with given key preceded with @app-name', () => {
      expect(AsyncStorage.getItem)
        .toHaveBeenCalledWith(`${appKey}:${key}`);
    });

    it('should return value from device storage by given key', () => {
      Storage.get(key).then(response => {
        expect(response).toEqual('pl');
      });
    });
  });

  describe('when Storage.delete was called', () => {
    const key = 'userLanguage';

    beforeEach(() => {
      spyOn(AsyncStorage, 'removeItem');
      Storage.delete(key);
    });

    it('should call removeItem function form AsyncStorage preceded with @app-name', () => {
      expect(AsyncStorage.removeItem)
        .toHaveBeenCalledWith(`${appKey}:${key}`);
    });
  });
});
