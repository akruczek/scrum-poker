import * as React from 'react';
import renderer, { act } from 'react-test-renderer';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { Separator } from '@core/styled';
import { EditRoomButtonsSet } from './edit-room-buttons-set';

describe('EditRoomButtonsSet', () => {
  const handleSubmit = jest.fn();
  const handleDismiss = jest.fn();

  describe('when EditRoomButtonsSet was mounted with all needed props', () => {
    const wrapper = renderer.create(
      <EditRoomButtonsSet handleSubmit={handleSubmit} handleDismiss={handleDismiss} />
    );

    it('should render 2 Button components and Separator between', () => {
      const { children } = wrapper.root.findByType(View).props;

      expect(children[0].type)
        .toEqual(Button);
      expect(children[1].type)
        .toEqual(Separator);
      expect(children[2].type)
        .toEqual(Button);
    });

    it('should call handleSubmit after press on first Button', () => {
      act(() => {
        wrapper.root.findAllByType(Button)[0].props.onPress();
      });

      expect(handleSubmit)
        .toHaveBeenCalled();
    });

    it('should call handleDismiss after press on second Button', () => {
      act(() => {
        wrapper.root.findAllByType(Button)[1].props.onPress();
      });

      expect(handleDismiss)
        .toHaveBeenCalled();
    });
  });
});
