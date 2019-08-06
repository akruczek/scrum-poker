import { getRoomIndex } from './get-room-index.helper';

describe('when getRoomIndex was called', () => {
  const rooms = [
    { id: 1, name: 'Room X' },
    { id: 2, name: 'Room Hello world' },
    { id: 3, name: 'Hello' },
    { id: 4, name: 'Test Room' },
  ];

  it('should return room index in given rooms array by given id', () => {
    expect(getRoomIndex(3)(rooms))
      .toEqual(2);
    expect(getRoomIndex(5)(rooms))
      .toEqual(-1);
  });
});
