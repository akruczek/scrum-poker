import { prepareRoomPayload } from './prepare-room-payload.helper';

describe('when prepareRoomPayload was called', () => {
  it('should return object with given name, description, empty users array and discovered flag', () => {
    const expectedPayload = {
      name: 'Room1',
      description: 'My Super Room',
      users: [],
      discovered: false,
    };

    expect(prepareRoomPayload('Room1', 'My Super Room'))
      .toEqual(expectedPayload);
  });
});
