import { prepareNewRoom } from './prepare-new-room.helper';

describe('when prepareNewRoom was called', () => {
  const room: any = {
    name: 'Room 1',
  };

  it('should return given room with correct new room', () => {
    expect(prepareNewRoom(room).name)
      .toEqual('Room 1')
  });
});
