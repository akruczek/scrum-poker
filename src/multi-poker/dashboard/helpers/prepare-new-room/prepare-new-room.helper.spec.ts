import { prepareNewRoom } from './prepare-new-room.helper';

describe('when prepareNewRoom was called', () => {
  const room: any = {
    name: 'Room 1',
  };

  const rooms: any[] = [
    {
      name: 'Room 2',
      id: 2,
    },
    {
      name: 'Room 3',
      id: 3,
    },
  ];

  it('should return given room with correct new room id and index based on whole array', () => {
    const expectedRoom = {
      index: 2,
      room: {
        name: 'Room 1',
        id: 4,
      },
    };

    expect(prepareNewRoom(room, rooms))
      .toEqual(expectedRoom)
  });
});
