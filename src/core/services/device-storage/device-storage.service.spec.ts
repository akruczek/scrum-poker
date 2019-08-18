import { AsyncStorage } from 'react-native';
import { Storage } from './device-storage.service';
import { of } from 'rxjs';

describe('Storage', () => {
  const appKey = '@scrum-poker';

  describe('when Storage.set was called', () => {
    const value = 'en';
    const key = 'userLanguage';

    describe('and device storage request succeeded', () => {  
      beforeEach(() => {
        spyOn(AsyncStorage, 'setItem');
        Storage.set(key, value);
      });
  
      it('should set in device storage given value with given key, preceded with @app-name', () => {
        expect(AsyncStorage.setItem)
          .toHaveBeenCalledWith(`${appKey}:${key}`, value);
      });
    });

    describe('and device storage request throws error', () => {
      const message = 'Error saving data in device storage';
      
      beforeEach(() => {
        spyOn(AsyncStorage, 'setItem').and.throwError(message);
        spyOn(console, 'error');
        Storage.set(key, value);
      });

      it('should throw error from AsyncStorage in console', () => {
        expect(console.error)
          .toHaveBeenCalledWith(message);
      });
    });
  });

  describe('when Storage.multiSet was called', () => {
    const keys = [ 'token', 'email' ];
    const values = [ '1234', 'test@example.com' ];

    describe('and device storage request succeeded', () => {
      beforeEach(() => {
        spyOn(AsyncStorage, 'multiSet');
        Storage.multiSet(keys, values);
      });
  
      it('should set in devices storage given values with given keys preceded with @app-name', () => {
        expect(AsyncStorage.multiSet)
          .toHaveBeenCalledWith([ [ `${appKey}:token`, '1234' ], [ `${appKey}:email`, 'test@example.com' ] ]);
      });
    });

    describe('and device storage request throws error', () => {
      const message = 'Error saving multi data in device storage';

      beforeEach(() => {
        spyOn(AsyncStorage, 'multiSet').and.throwError(message);
        spyOn(console, 'error');
        Storage.multiSet(keys, values);
      });

      it('should throw error from AsyncStorage in console', () => {
        expect(console.error)
          .toHaveBeenCalledWith(message);
      });
    });
  });

  describe('when Storage.get was called', () => {
    const key = 'userLanguage';

    describe('and device storage request succeeded', () => {
      beforeEach(() => {
        spyOn(AsyncStorage, 'getItem').and.returnValue('pl');
        Storage.get(key);
      });
  
      it('should call getItem function of AsyncStorage with given key preceded with @app-name', () => {
        expect(AsyncStorage.getItem)
          .toHaveBeenCalledWith(`${appKey}:${key}`);
      });
  
      it('should return value from device storage by given key', () => {
        expect.assertions(1);
        return expect(Storage.get(key)).resolves.toEqual('pl');
      });
    });

    describe('and device storage request throws error', () => {
      const message = 'Error getting data from device storage';

      beforeEach(() => {
        spyOn(AsyncStorage, 'getItem').and.throwError(message);
        spyOn(console, 'error');
        Storage.get(key);
      });

      it('should throw error from AsyncStorage in console', () => {
        expect(console.error)
          .toHaveBeenCalledWith(message);
      });
    });
  });

  describe('when Storage.multiGet was called', () => {
    const keys = [ 'language', 'token' ];

    describe('and device storage request succeeded', () => {
      beforeEach(() => {
        spyOn(AsyncStorage, 'multiGet').and.returnValue([
          [ `${appKey}:language`, 'pl' ],
          [ `${appKey}:token`, '1234' ],
        ]);
        Storage.multiGet(keys);
      });
  
      it('should call multiGet function of AsyncStorage with given keys preceded with @app-name', () => {
        expect(AsyncStorage.multiGet)
          .toHaveBeenCalledWith([ `${appKey}:language`, `${appKey}:token` ]);
      });
  
      it('should return values from device storage by given keys', ()  => {
        expect.assertions(1);
        return Storage.multiGet(keys).then(response => {
          expect(response).toEqual([
            [ `${appKey}:language`, 'pl' ],
            [ `${appKey}:token`, '1234' ],
          ]);
        });
      });
    });

    describe('and device storage request throws error', () => {
      const message = 'Error getting multi data from device storage';

      beforeEach(() => {
        spyOn(AsyncStorage, 'multiGet').and.throwError(message);
        spyOn(console, 'error');
        Storage.multiGet(keys);
      });

      it('should throw error from AsyncStorage in console', () => {
        expect(console.error)
          .toHaveBeenCalledWith(message);
      });
    });
  });

  describe('when Storage.delete was called', () => {
    const key = 'userLanguage';

    describe('and device storage request succeeded', () => {
      beforeEach(() => {
        spyOn(AsyncStorage, 'removeItem');
        Storage.delete(key);
      });
  
      it('should call removeItem function form AsyncStorage with key preceded with @app-name', () => {
        expect(AsyncStorage.removeItem)
          .toHaveBeenCalledWith(`${appKey}:${key}`);
      });
    });

    describe('and device storage request throws error', () => {
      const message = 'Error removing data from device storage';

      beforeEach(() => {
        spyOn(AsyncStorage, 'removeItem').and.throwError(message);
        spyOn(console, 'error');
        Storage.delete(key);
      });

      it('should throw error from AsyncStorage in console', () => {
        expect(console.error)
          .toHaveBeenCalledWith(message);
      });
    });
  });

  describe('when Storage.multiDelete was called', () => {
    const keys = [ 'language', 'token' ];

    describe('and device storage request succeeded', () => {
      beforeEach(() => {
        spyOn(AsyncStorage, 'multiRemove');
        Storage.multiDelete(keys);
      });
  
      it('should call multiRemove function from AsyncStorage with keys preceded with @app-name', () => {
        expect(AsyncStorage.multiRemove)
          .toHaveBeenCalledWith([ `${appKey}:language`, `${appKey}:token` ]);
      });
    });

    describe('and device storage request throws error', () => {
      const message = 'Error removing multi data from device storage';

      beforeEach(() => {
        spyOn(AsyncStorage, 'multiRemove').and.throwError(message);
        spyOn(console, 'error');
        Storage.multiDelete(keys);
      });

      it('should throw error from AsyncStorage in console', () => {
        expect(console.error)
          .toHaveBeenCalledWith(message);
      });
    });
  })
});
