import { getNewRoomId } from './get-new-room-id.helper';

describe('when getNewRoomId was called', () => {
  describe('and given rooms array is empty', () => {
    const rooms: any = [];

    it('should return 0', () => {
      expect(getNewRoomId(rooms))
        .toEqual(0);
    });
  });

  describe('and given rooms array is not empty', () => {
    const rooms = [
      { id: 1 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 7 },
    ];

    it('should return incremented the greatest room id', () => {
      expect(getNewRoomId(rooms))
        .toEqual(8);
    });
  });

  describe('and given rooms array contains nil values or rooms with nil id', () => {
    const rooms = [
      { id: 1 },
      { id: null },
      { id: 3 },
      undefined,
      { id: 2 },
      NaN,
    ];

    it('should omit these values and return incremented the greatest room id', () => {
      expect(getNewRoomId(rooms))
        .toEqual(4);
    });
  });
});
