import { testHook } from '@test-utils/test-hook';
import { EDIT_ROOMS_TYPES } from '@core/models';
import { pokers } from '@core/constants';
import { useUpdateRoom } from './update-room.hook';

describe('useUpdateRoom', () => {
  const room = {
    id: 'id',
    name: 'name',
    description: 'string',
    users: {},
    discovered: false,
    allAdmins: true,
    poker: pokers[0],
    projectKey: 'XX',
    customField: 'customfield_10021',
    defaultIssueType: 'Story',
    defaultIssueStatus: 'To Do',
  };

  const setName = jest.fn();
  const setDescription = jest.fn();
  const setProjectKey = jest.fn();
  const setAllAdmins = jest.fn();
  const setPoker = jest.fn();

  describe('and room is not provided', () => {
    beforeEach(() => {
      testHook(() => {
        useUpdateRoom(EDIT_ROOMS_TYPES.CREATE)(setName, setDescription, setProjectKey, setAllAdmins, setPoker);
      });
    });

    it('should do nothing', () => {
      expect(setName)
        .not.toHaveBeenCalled();
      expect(setDescription)
        .not.toHaveBeenCalled();
      expect(setProjectKey)
        .not.toHaveBeenCalled();
      expect(setAllAdmins)
        .not.toHaveBeenCalled();
      expect(setPoker)
        .not.toHaveBeenCalled();
    });
  });

  describe('when useUpdateRoom hook was called', () => {
    describe('and room is provided', () => {
      beforeEach(() => {
        testHook(() => {
          useUpdateRoom(EDIT_ROOMS_TYPES.CREATE, room)(setName, setDescription, setProjectKey, setAllAdmins, setPoker);
        });
      });

      it('should call given methods with specific arguments', () => {
        expect(setName)
          .not.toHaveBeenCalledWith(room.name);
        expect(setDescription)
          .not.toHaveBeenCalledWith(room.description);
        expect(setProjectKey)
          .not.toHaveBeenCalledWith(room.projectKey);
        expect(setAllAdmins)
          .not.toHaveBeenCalledWith(room.allAdmins);
        expect(setPoker)
          .not.toHaveBeenCalledWith(room.poker);
      });
    });
  });
});
