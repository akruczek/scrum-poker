import * as React from 'react';
import { Input } from 'react-native-elements';
import { Provider } from 'react-redux';
import renderer, { act } from 'react-test-renderer';
import { Separator } from '@core/styled';
import { EditRoomForm } from './edit-room-form';
import { appStore } from '../../../../../../store/configure-store';

describe('EditRoomForm', () => {
  const handleChange = jest.fn();

  describe('when EditRoomForm was mounted with all needed props', () => {
    const wrapper = renderer.create(
      <Provider store={appStore}>
        <EditRoomForm name="" description="" projectKey="" handleChange={handleChange} />
      </Provider>
    );

    it('should render 4 Separator components and 3 Input components', () => {
      expect(wrapper.root.findAllByType(Separator).length)
        .toEqual(4);
      expect(wrapper.root.findAllByType(Input).length)
        .toEqual(3);
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
