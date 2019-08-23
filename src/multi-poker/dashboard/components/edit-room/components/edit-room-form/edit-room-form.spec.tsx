import * as React from 'react';
import renderer, { act } from 'react-test-renderer';
import { EditRoomForm } from './edit-room-form';
import { Separator } from '@core/styled';
import { Input } from 'react-native-elements';

describe('EditRoomForm', () => {
  const handleChange = jest.fn();

  describe('when EditRoomForm was mounted with all needed props', () => {
    const wrapper = renderer.create(
      <EditRoomForm name="" description="" handleChange={handleChange} />
    );

    it('should render 3 Separator components and 2 Input components', () => {
      expect(wrapper.root.findAllByType(Separator).length)
        .toEqual(3);
      expect(wrapper.root.findAllByType(Input).length)
        .toEqual(2);
    });

    it('should call handleChange prop with "name" and passed value after change first input value', () => {
      act(() => {
        wrapper.root.findAllByType(Input)[0].props.onChangeText('new Value');
      });

      expect(handleChange)
        .toHaveBeenCalledWith('name', 'new Value');
    });

    it('should call handleChange prop with "description" and passed value after change seconds input value', () => {
      act(() => {
        wrapper.root.findAllByType(Input)[1].props.onChangeText('desc');
      });

      expect(handleChange)
        .toHaveBeenCalledWith('description', 'desc');
    });
  });
});
