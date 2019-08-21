import { getRoomsList } from './get-rooms-list.helper';

describe('when getRoomsList was called', () => {
  describe('and given rooms array is blank', () => {
    const rooms = {};

    it('should return empty array', () => {
      expect(getRoomsList(rooms))
        .toEqual([]);
    });
  });

  describe('and given rooms array is present', () => {
    const rooms = [
      { name: 'room1' },
      null,
      { name: 'room2' },
      {},
    ];

    it('should return given array with rejected blank items', () => {
      const expectedRooms = [
        { name: 'room1' },
        { name: 'room2' },
      ];

      expect(getRoomsList(rooms))
        .toEqual(expectedRooms);
    });
  });
});
