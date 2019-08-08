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
      discovered: false,
      id: 1,
      name: 'Super Room',
      users: {
        0: { selectedValue: null },
        1: { selectedValue: null },
      },
    };

    expect(getResetPayload(room))
      .toEqual(expectedResult);
  });
});
