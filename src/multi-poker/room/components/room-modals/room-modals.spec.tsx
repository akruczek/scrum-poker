import * as React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { pokers } from '@core/constants';
import { _RoomModals } from './room-modals';
import { SelectCard } from '../../../dashboard/components/select-card/select-card';
import { JiraPusher } from '../jira-pusher/jira-pusher';
import { EditRoom } from '../../../dashboard/components/edit-room/edit-room';
import { appStore } from '../../../../store/configure-store';

describe('RoomModals', () => {
  const props: any = {
    room: {
      id: '1234',
      name: 'room-1',
      description: 'this is room number 1',
      poker: pokers[0],
      users: [
        {
          id: '1234',
          email: 'test@example1.com',
        },
        {
          id: '1111',
          email: 'test@example2.com',
        },
      ] as any,
      discovered: false,
      projectKey: 'X',
      customField: 'custom_field',
      defaultIssueType: 'Story',
      defaultIssueStatus: 'To Do',
      allAdmins: true,
    },
    user: {
      id: '1234',
      email: 'test@example.com',
      selectedValue: {
        value: 1,
        label: '1',
      },
    },
    setSelecting: jest.fn(),
    setJiraPusherVisibility: jest.fn(),
    setEditingRoom: jest.fn(),
    handleReset: jest.fn(),
    setValue: jest.fn(),
    updateRoom: jest.fn(),
  }
  describe('when RoomModals was mounted with all needed props', () => {
    describe('and isSelecting props is truthy', () => {
      const wrapper = renderer.create(
        <Provider store={appStore}>
          <_RoomModals {...props} isJiraPusherVisible={false} isEditingRoom={false} isSelecting />
        </Provider>
      );

      it('should render SelectCard component', () => {
        expect(wrapper.root.findByType(SelectCard))
          .toBeTruthy();
      });
    });

    describe('and isJiraPusherVisible prop is truthy', () => {
      const wrapper = renderer.create(
        <Provider store={appStore}>
          <_RoomModals {...props} isEditingRoom={false} isSelecting={false} isJiraPusherVisible />
        </Provider>
      );

      it('should render JiraPusher component', () => {
        expect(wrapper.root.findByType(JiraPusher))
          .toBeTruthy();
      });
    });

    describe('and isEditingRoom prop is truthy', () => {
      const wrapper = renderer.create(
        <Provider store={appStore}>
          <_RoomModals {...props} isSelecting={false} isJiraPusherVisible={false} isEditingRoom />
        </Provider>
      );

      it('should render EditRoom component', () => {
        expect(wrapper.root.findByType(EditRoom))
          .toBeTruthy();
      });
    });

    describe('and isSelecting, isJiraPusherVisible and isEditingRoom are falsy', () => {
      const wrapper = renderer.create(
        <Provider store={appStore}>
          <_RoomModals {...props} isSelecting={false} isJiraPusherVisible={false} isEditingRoom={false} />
        </Provider>
      );

      it('should render nothing', () => {
        expect(wrapper.root.findAllByType(SelectCard))
          .toHaveLength(0);
      });
    });
  });
});
