import { addNewRoom } from './add-new-room.helper';
import { prepareNewRoom } from '../prepare-new-room/prepare-new-room.helper';

describe('when addNewRoom was called', () => {
  const setCreateRoom = jest.fn();
  const addRoom = jest.fn();
  const handleNavigate = jest.fn();
  const room: any = {
    id: '1234',
    name: 'hello',
    description: 'world',
  };

  beforeEach(() => {
    addNewRoom(room)(setCreateRoom, handleNavigate, addRoom);
  });

  it('should call setCreateRoom with false', () => {
    expect(setCreateRoom)
      .toHaveBeenCalledWith(false);
  });

  it('should call addRoom with prepared new room', () => {
    expect(addRoom)
      .toHaveBeenCalledWith(prepareNewRoom(room));
  });

  it('should call handleNavigate with prepared new room', () => {
    expect(handleNavigate)
      .toHaveBeenCalledWith(prepareNewRoom(room));
  });
});
