import * as React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import { CARDS } from '@core/constants';
import { _RoomModals } from './room-modals';
import { SelectCard } from '../../../dashboard/components/select-card/select-card';
import { JiraPusher } from '../jira-pusher/jira-pusher';
import { EditRoom } from '../../../dashboard/components/edit-room/edit-room';
import { appStore } from '../../../../store/configure-store';
import { getNewEstimation } from '../../helpers';

describe('RoomModals', () => {
  const mockedFunctions = {
    setSelecting: jest.fn(),
    setJiraPusherVisibility: jest.fn(),
    setEditingRoom: jest.fn(),
    handleReset: jest.fn(),
    setValue: jest.fn(),
    updateRoom: jest.fn(),
  };

  const user: any = {
    email: 'test@example.com',
    id: 'test1',
    role: 'admin',
  };

  const room: any = {
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

  describe('when RoomModals was mounted with all needed props', () => {
    describe('and "isSelecting" props equals true', () => {
      const wrapper = renderer.create(
        <_RoomModals
            {...mockedFunctions}
            user={user}
            room={room}
            isJiraPusherVisible={false}
            isEditingRoom={false}
            isSelecting
        />
      );

      it('should render SelectCard component', () => {
        expect(wrapper.root.findByType(SelectCard))
          .toBeTruthy();
      });

      it('should call setSelecting with "false" after call SelectCard handleSelect prop', () => {
        act(() => {
          wrapper.root.findByType(SelectCard).props.handleSelect();
        });

        expect(mockedFunctions.setSelecting)
          .toHaveBeenCalledWith(false);
      });

      it('should call setValue with new estimation after call SelectCard handleSelect prop', () => {
        expect(mockedFunctions.setValue)
          .toHaveBeenCalledWith(getNewEstimation(undefined as any, room.id, user.email));
      });
    });

    // describe('and "isJiraPusherVisible" prop equals true', () => {
    //   beforeEach(() => {
    //     spyOn(appStore, 'getState').and.returnValue({ translations: {} });
    //   });

    //   const wrapper = renderer.create(
    //     <Provider store={appStore}>
    //       <_RoomModals
    //           {...mockedFunctions}
    //           isEditingRoom={false}
    //           isSelecting={false}
    //           user={user}
    //           room={room}
    //           isJiraPusherVisible
    //       />
    //     </Provider>
    //   );

    //   it('should render JiraPusher component', () => {
    //     expect(wrapper.root.findByType(JiraPusher))
    //       .toBeTruthy();
    //   });
    // });

    describe('and "isEditingRoom" prop equals true', () => {
      const wrapper = renderer.create(
        <_RoomModals
            {...mockedFunctions}
            isJiraPusherVisible={false}
            isSelecting={false}
            user={user}
            room={room}
            isEditingRoom
        />
      );

      it('should render EditRoom component', () => {
        expect(wrapper.root.findByType(EditRoom))
          .toBeTruthy();
      });
    });

    describe('and all visibility flags equals false', () => {
      const wrapper = renderer.create(
        <_RoomModals
            {...mockedFunctions}
            isEditingRoom={false}
            isSelecting={false}
            isJiraPusherVisible={false}
            user={user}
            room={room}
        />
      );

      it('should not render any child', () => {
        expect(wrapper.root.children)
          .toEqual([]);
      });
    });
  });
});
