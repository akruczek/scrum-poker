import { joinRoom } from './join-room.helper';
import { SCREENS } from '../../../../core/navigation/screens';
import { act } from 'react-test-renderer';

describe('when joinRoom was called', () => {
  const setRoom = jest.fn();
  const navigate = jest.fn();
  const room: any = { id: 1 };

  it('should call given setRoom function with given room', () => {
    joinRoom(setRoom, navigate, room);

    expect(setRoom)
      .toHaveBeenCalledWith(room);
  });

  it('should call given navigate function with SCREEN.ROOM', () => {
    joinRoom(setRoom, navigate, room);

    expect(navigate)
      .toHaveBeenCalledWith(SCREENS.ROOM);
  });
});
