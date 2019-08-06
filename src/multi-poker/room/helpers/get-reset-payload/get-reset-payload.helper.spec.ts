import { getResetPayload } from './get-reset-payload.helper';

describe('when getResetPayload was called', () => {
  const rooms: any = [
    {
      id: 1,
      name: 'Super Room',
      users: [
        { selectedValue: 5 },
        { selectedValue: 2 },
      ],
    },
    {
      id: 2,
      name: 'New Room',
      users: [],
    },
  ];
  const room: any = rooms[0];

  it('should return given room extended with discovered and users and room index', () => {
    const expectedResult = {
      room: {
        id: 1,
        name: 'Super Room',
        discovered: false,
        users: [
          { selectedValue: null },
          { selectedValue: null },
        ],
      },
      index: 0,
    };

    expect(getResetPayload(room, rooms))
      .toEqual(expectedResult);
  });
});
