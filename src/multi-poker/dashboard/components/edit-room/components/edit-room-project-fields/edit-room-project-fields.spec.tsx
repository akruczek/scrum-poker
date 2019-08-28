import * as React from 'react';
import renderer, { act } from 'react-test-renderer';
import { CustomInput, LinkButton } from '@core/components';
import { EditRoomProjectFields } from './edit-room-project-fields';

describe('EditRoomProjectFields', () => {
  const handleChange = jest.fn();
  const chooseProject = jest.fn();

  describe('when EditRoomProjectFields was mounted with all needed props', () => {
    const wrapper = renderer.create(
      <EditRoomProjectFields
          handleChange={handleChange}
          chooseProject={chooseProject}
          name="name"
          projectKey="key"
      />
    );

    it('should render 2 CustomInput components', () => {
      expect(wrapper.root.findAllByType(CustomInput).length)
        .toEqual(2);
    });

    it('should render LinkButton component', () => {
      expect(wrapper.root.findAllByType(LinkButton).length)
        .toEqual(1);
    });

    it('should call chooseProject with "true" after call LinkButton handlePress prop', () => {
      act(() => {
        wrapper.root.findByType(LinkButton).props.handlePress();
      });

      expect(chooseProject)
        .toHaveBeenCalledWith(true);
    });

    it('should call handleChange with "name" and given value after change first input value', () => {
      act(() => {
        wrapper.root.findAllByType(CustomInput)[0].props.handleChange('newValue');
      });

      expect(handleChange)
        .toHaveBeenCalledWith('name', 'newValue');
    });

    it('should call handleChange with "projectKey" and given value after change first input value', () => {
      act(() => {
        wrapper.root.findAllByType(CustomInput)[1].props.handleChange('newKey');
      });

      expect(handleChange)
        .toHaveBeenCalledWith('projectKey', 'newKey');
    });
  });
});
