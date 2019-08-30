import { pokers } from '@core/constants';
import { getListedUserProperties } from './get-listed-user-properties.helper';

describe('when getListedUserProperties was called', () => {
  const room: any = {
    id: 1,
    name: 'room-1',
    description: 'this is room number 1',
    poker: pokers[0],
    users: [
      {
        email: 'test@example1.com',
      },
      {
        email: 'test@example2.com',
      },
    ],
    discovered: false,
  };

  const user: any = {
    email: 'string@number.boolean',
    id: 'id',
    selectedValue: 1,
    role: 'admin',
  }

  it('should check if given user selectedValue is present and return as first arg', () => {
    const [ isValuePresent ] = getListedUserProperties(room, user, 'test@example.com');

    expect(isValuePresent)
      .toBeTruthy();
  });

  it('should given room discovered property', () => {
    const [ _, isRoomDiscovered ] = getListedUserProperties(room, user, 'test@example.com');

    expect(isRoomDiscovered)
      .toBeFalsy();
  });
});
