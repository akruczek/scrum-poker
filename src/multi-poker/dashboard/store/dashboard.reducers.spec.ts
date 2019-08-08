import * as R from 'ramda';
import { setRooms, setRoom, addRoom, removeRoom, addUser, reset, setValue } from './dashboard.actions';
import { roomsReducer } from './dashboard.reducers';

describe('Dashboard Reducers', () => {
  let store: any = {};
  let payload: any;
  let action: any;

  beforeEach(() => {
    store = {
      models: {},
      model: {},
    };
  });

  describe('when setRoomsReducer was called', () => {
    it('should replace models with action payload', () => {
      payload = [ { id: 1 }, { id: 2 } ]
      action = setRooms(payload);
      const newState = roomsReducer(store, action);

      expect(newState.models)
        .toEqual(payload);
    });
  });

  describe('when setRoomReducer was called', () => {
    it('should replace model with action payload', () => {
      payload = { name: 'Room', id: 2 };
      action = setRoom(payload);
      const newState = roomsReducer(store, action);

      expect(newState.model)
        .toEqual(payload);
    });
  });

  describe('when addRoomReducer was called', () => {
    it('should replace exact room in models by id with room from action payload', () => {
      payload = {
        name: 'Hello',
        id: 8,
      };
      action = addRoom(payload);
      const newState = roomsReducer(store, action);

      expect(newState.models[8])
        .toEqual(payload);
    });
  });

  describe('when removeRoomReducer was called', () => {
    beforeEach(() => {
      store = {
        models: [
          { id: 0 },
          { id: 1 },
          { id: 2 },
        ],
        model: {},
      };
    });

    it('should remove room from models with index from action payload', () => {
      payload = 1;
      action = removeRoom(payload);
      const newState = roomsReducer(store, action);
      const expectedModels = [
        { id: 0 },
        { id: 2 },
      ];

      expect(newState.models)
        .toEqual(expectedModels);
    });

    it('should do nothing when room with given index does not exist', () => {
      payload = 3;
      action = removeRoom(payload);
      const newState = roomsReducer(store, action);
      const expectedModels = [
        { id: 0 },
        { id: 1 },
        { id: 2 },
      ];

      expect(newState.models)
        .toEqual(expectedModels);
    });
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
