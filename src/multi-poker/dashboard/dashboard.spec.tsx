import * as React from 'react';
import renderer, { act } from 'react-test-renderer';
import { of } from 'rxjs';
import { Provider } from 'react-redux';
import { ScrollContainer, AppContainer } from '@core/styled';
import { Firebase } from '@core/services/firebase/firebase.service';
import { pokers, SCREENS } from '@core/constants';
import { _Dashboard } from './dashboard';
import { ListedRoom } from './components/listed-room/listed-room';
import { ListedNewRoom } from './components/listed-new-room/listed-new-room';
import { EditRoom } from './components/edit-room/edit-room';
import { appStore } from '../../store/configure-store';

describe('Dashboard', () => {
  const mockedRooms: any = [
    {
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
    },
    {
      id: 2,
      name: 'room-2',
      description: 'this is room number 2',
      poker: pokers[2],
      users: [
        {
          email: 'test@example1.com',
        },
        {
          email: 'test@example2.com',
        },
      ],
      discovered: false,
    },
  ];

  const mockedJiraConfiguration = {
    customField: '',
    defaultIssueType: '',
    defaultIssueStatus: '',
  };

  const setRooms = jest.fn();
  const setRoom = jest.fn();
  const addRoom = jest.fn();
  const removeRoom = jest.fn();
  const mockedNavigation: any = {
    navigate: jest.fn(),
  };

  describe('when Dashboard was mounted with all needed props', () => {
    beforeEach(() => {
      spyOn(Firebase, 'subscribe').and.returnValue(of({ 
        database: () => ({}),
       }));
    });

    const component = (
      <Provider store={appStore}>
        <_Dashboard
            rooms={mockedRooms}
            setRooms={setRooms}
            setRoom={setRoom}
            addRoom={addRoom}
            removeRoom={removeRoom}
            navigation={mockedNavigation}
            jiraAccountId="some-uuid"
            jiraConfiguration={mockedJiraConfiguration}
        />
      </Provider>
    );

    it('should wrap whole content with AppContainer component', () => {
      const wrapper = renderer.create(component);

      expect(wrapper.root.findByType(AppContainer))
        .toBeTruthy();
    });

    it('should render as many ListedRoom component as rooms was passed in props', () => {
      const wrapper = renderer.create(component);

      expect(wrapper.root.findAllByType(ListedRoom).length)
        .toEqual(mockedRooms.length);
    });

    it('should render ListedRoom component inside ScrollContainer', () => {
      const wrapper = renderer.create(component);
      const scrollContainer = wrapper.root.findByType(ScrollContainer);

      expect(scrollContainer.findAllByType(ListedRoom).length)  
        .toBeGreaterThan(0);
    });

    it('should render ListedNewRoom inside ScrollContainer', () => {
      const wrapper = renderer.create(component);
      const scrollContainer = wrapper.root.findByType(ScrollContainer);

      expect(scrollContainer.findAllByType(ListedNewRoom))  
        .toBeTruthy();
    });
    
    it('should call setRoom with ListedRoom room when handleNavigate prop was called', () => {
      const wrapper = renderer.create(component);
      act(() => {
        wrapper.root.findAllByType(ListedRoom)[0].props.handleNavigate(mockedRooms[0]);
      });

      expect(setRoom)
        .toHaveBeenCalledWith(mockedRooms[0]);
    });

    it('should call navigate from navigation with SCREENS.ROOM when handleNavigate prop was called', () => {
      const wrapper = renderer.create(component);
      act(() => {
        wrapper.root.findAllByType(ListedRoom)[0].props.handleNavigate(mockedRooms[0]);
      });

      expect(mockedNavigation.navigate)
        .toHaveBeenCalledWith(SCREENS.ROOM);
    });

    describe('when setCreateRoom prop of ListedNewRoom component was called', () => {
      const wrapper = renderer.create(component);

      
      it('should show EditRoom component', () => {
        act(() => {
          wrapper.root.findByType(ListedNewRoom).props.setCreateRoom(true);
        });
    
        const editRoom: any = wrapper.root.findByType(EditRoom);

        expect(editRoom)
          .toBeTruthy();
        expect(editRoom.parent.type)
          .not.toEqual('ScrollView');
      });

      it('should hide EditRoom component after call EditRoom handleDismiss prop', () => {
        act(() => {
          wrapper.root.findByType(EditRoom).props.handleDismiss();
        });

        expect(wrapper.root.findAllByType(EditRoom).length)
          .toEqual(0);
      });
    });


    it('should remove one room after call handleRemoveRoom prop of ListedRoom component', () => {
      const wrapper = renderer.create(component);
      act(() => {
        wrapper.root.findAllByType(ListedRoom)[0].props.handleRemoveRoom(mockedRooms[0]);
      });

      expect(wrapper.root.findAllByType(ListedRoom).length)
        .toEqual(2);
    });
  });
});
