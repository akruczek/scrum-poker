import * as React from 'react';
import renderer from 'react-test-renderer';
import { SpaceNameTooltip } from './space-name-tooltip';
import { Text } from '../../../../../core/styled';

describe('SpaceNameTooltip', () => {
  describe('when SpaceNameTooltip was mounted with all needed props', () => {
    const wrapper = renderer.create(
      <SpaceNameTooltip />
    );

    it('should render 2 Text components wrapped with Text component', () => {
      expect(wrapper.root.findAllByType(Text)[0].props.children.length)
        .toEqual(2);
    });
  });  
});
