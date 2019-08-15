import { CARDS } from '@core/constants';
import { updateRoomProperties } from './update-room-properties.helper';

describe('when updateRoomProperties was called', () => {
  const updateRoom = jest.fn();
  const setEditingRoom = jest.fn();

  const currentRoom: any = {
    allAdmins: false,
    description: 'Hello',
    discovered: false,
    id: '1234',
    name: 'inbox',
    poker: {
      cards: CARDS.STANDARD_POKER,
      description: 'Standard Scrum Poker',
      icon: '1',
      name: 'Standard',
      title: 'Standard Poker',
    },
    users: {
      'test@example_com': {
        email: 'test@example.com',
        id: 'test1',
        role: 'admin',
      },
    },
  };

  const newRoom: any = {
    allAdmins: true,
    description: 'Hello 1',
  };

  beforeEach(() => {
    updateRoomProperties(newRoom, currentRoom)(updateRoom, setEditingRoom);
  });

  it('should call updateRoom with merged room states and users', () => {
    const expectedRoom: any = {
      allAdmins: true,
      description: 'Hello 1',
      discovered: false,
      id: '1234',
      name: 'inbox',
      poker: {
        cards: CARDS.STANDARD_POKER,
        description: 'Standard Scrum Poker',
        icon: '1',
        name: 'Standard',
        title: 'Standard Poker',
      },
      users: {
        'test@example_com': {
          email: 'test@example.com',
          id: 'test1',
          role: 'admin',
        },
      },
    };

    expect(updateRoom)
      .toHaveBeenCalledWith(expectedRoom);
  });

  it('should call setEditingRoom with "false"', () => {
    expect(setEditingRoom)
      .toHaveBeenCalledWith(false);
  });
});
