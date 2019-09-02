import { SCREENS } from '@core/navigation/screens';

export const forceQuitRoom = (
  setSelecting: (value: boolean) => void,
  setJiraPusherVisibility: (value: boolean) => void,
  setEditingRoom: (value: boolean) => void,
  navigate: (screen: SCREENS) => void,
) => {
  setSelecting(false);
  setJiraPusherVisibility(false);
  setEditingRoom(false);
  navigate(SCREENS.MULTI_PLAYER);
};
