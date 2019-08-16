import * as React from 'react';
import { View } from 'react-native';
import renderer, { act } from 'react-test-renderer';
import { Button } from 'react-native-elements';
import { Separator } from '@core/styled';
import { RoomButtonsSet } from './room-buttons-set';

describe('RoomButtonsSet', () => {
  const mockedFunctions = {
    handleShowDown: jest.fn(),
    handleReset: jest.fn(),
    handlePushToJira: jest.fn(),
  };

  describe('when RoomButtonsSet was mounted with all needed props', () => {
    const wrapper = renderer.create(
      <RoomButtonsSet {...mockedFunctions} />
    );

    it('should render 2 Button component with Separator component between inside Container', () => {
      const container = wrapper.root.findByType(View);

      expect(container.findAllByType(Button).length)
        .toEqual(2);
      expect(container.findByType(Separator))
        .toBeTruthy();
      expect(container.props.children[0].type)
        .toEqual(Button);
      expect(container.props.children[2].type)
        .toEqual(Button)
      expect(container.props.children[1].type)
        .toEqual(Separator);
    });

    it('should render second Button with complement of isDiscovered as disabled prop', () => {
      expect(wrapper.root.findAllByType(Button)[1].props.disabled)
        .toBeTruthy();
    });

    it('should call handleReset after press on second Button', () => {
      act(() => {
        wrapper.root.findAllByType(Button)[1].props.onPress();
      });

      expect(mockedFunctions.handleReset)
        .toHaveBeenCalled();
    });
  });

  describe('when RoomButtonsSet was mounted with "true" isDiscovered prop', () => {
    const wrapper = renderer.create(
      <RoomButtonsSet {...mockedFunctions} isDiscovered={true} />
    );

    it('should render first Button with handlePushToJira as onPress prop', () => {
      expect(wrapper.root.findAllByType(Button)[0].props.onPress) 
        .toEqual(mockedFunctions.handlePushToJira);
    });

    it('should call handlePushToJira after press on first Button', () => {
      act(() => {
        wrapper.root.findAllByType(Button)[0].props.onPress();
      });

      expect(mockedFunctions.handlePushToJira)
        .toHaveBeenCalled();
    });
  });

  describe('when RoomButtonsSet was mounted with "false" isDiscovered prop', () => {
    const wrapper = renderer.create(
      <RoomButtonsSet {...mockedFunctions} isDiscovered={false} />
    );

    it('should render first Button with handleShowDown as onPress prop', () => {
      expect(wrapper.root.findAllByType(Button)[0].props.onPress) 
        .toEqual(mockedFunctions.handleShowDown);
    });

    it('should call handleShowDown after press on first Button', () => {
      act(() => {
        wrapper.root.findAllByType(Button)[0].props.onPress();
      });

      expect(mockedFunctions.handleShowDown)
        .toHaveBeenCalled();
    });
  });
});
