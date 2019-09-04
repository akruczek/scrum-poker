import { SCREENS } from '@core/constants';
import { forceQuitRoom } from './force-quit-room.helper';

describe('when forceQuitRoom was called', () => {
  const setSelecting = jest.fn();
  const setJiraPusherVisibility = jest.fn();
  const setEditingRoom = jest.fn();
  const navigate = jest.fn();

  beforeEach(() => {
    forceQuitRoom(setSelecting, setJiraPusherVisibility, setEditingRoom, navigate);
  });

  it('should call first 3 given functions with "false"', () => {
    expect(setSelecting)
      .toHaveBeenCalledWith(false);
    expect(setJiraPusherVisibility)
      .toHaveBeenCalledWith(false);
    expect(setEditingRoom)
      .toHaveBeenCalledWith(false);
  });

  it('should call navigate with SCREENS.MULTI_PLAYER', () => {
    expect(navigate)
      .toHaveBeenCalledWith(SCREENS.MULTI_PLAYER);
  });
});
