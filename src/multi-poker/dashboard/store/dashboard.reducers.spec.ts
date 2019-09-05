import { setRooms, setRoom, addRoom, removeRoom } from './dashboard.actions';
import { dashboardReducer } from './dashboard.reducers';

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
      const newState = dashboardReducer(store, action);

      expect(newState.models)
        .toEqual(payload);
    });
  });

  describe('when setRoomReducer was called', () => {
    it('should replace model with action payload', () => {
      payload = { name: 'Room', id: 2 };
      action = setRoom(payload);
      const newState = dashboardReducer(store, action);

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
      const newState = dashboardReducer(store, action);

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
      const newState = dashboardReducer(store, action);
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
      const newState = dashboardReducer(store, action);
      const expectedModels = [
        { id: 0 },
        { id: 1 },
        { id: 2 },
      ];

      expect(newState.models)
        .toEqual(expectedModels);
    });
  });
});
