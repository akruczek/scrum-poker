import * as R from 'ramda';
import { addUser, reset, setValue } from './room.actions';
import { roomsReducer } from './room.reducers';

describe('RoomReducers', () => {
  let store: any = {};
  let payload: any;
  let action: any;

  beforeEach(() => {
    store = {
      models: {},
      model: {},
    };
  });

  describe('when addUserReducer was called', () => {
    it('should append to models action payload', () => {
      payload = { id: 4 };
      action = addUser(payload);
      const newState = roomsReducer(store, action);
  
      expect(R.last(newState.models))
        .toEqual(payload);
    });
  });
  
  describe('when resetReducer was called', () => {
    it('should replace model with action payload', () => {
      payload = {
        id: null,
      };
      action = reset(payload);
      const newState = roomsReducer(store, action);
  
      expect(newState.model)
        .toEqual({ id: null });
    });
  });
  
  describe('when setValueReducer was called', () => {
    beforeEach(() => {
      store = {
        model: {},
        models: [
          {
            users: [
              { name: 'user x' },
              { name: 'user y' },
            ],
          },
        ],
      };
    });
  
    it('should assoc value from action payload by given room and user id', () => {
      payload = {
        roomIndex: 0,
        userIndex: 1,
        value: { name: 'Super user' },
      };
      action = setValue(payload);
      const newState = roomsReducer(store, action);
  
      const expectedModels = [
        {
          users: [
            { name: 'user x' },
            { name: 'user y' },
          ],
        },
      ];
  
      expect(newState.models)
      .toEqual(expectedModels);
    });
  });
});