import { pokers } from '@core/constants';
import { prepareRoomPayload } from './prepare-room-payload.helper';

describe('when prepareRoomPayload was called', () => {
  it('should return object with given arguments, empty users array and discovered flag', () => {
    const expectedPayload = {
      name: 'Room1',
      description: 'My Super Room',
      allAdmins: false,
      users: [],
      discovered: false,
      poker: pokers[0],
      projectKey: 'KEY',
    };

    expect(prepareRoomPayload('Room1', 'My Super Room', 'KEY', false, pokers[0]))
      .toEqual(expectedPayload);
  });
});
