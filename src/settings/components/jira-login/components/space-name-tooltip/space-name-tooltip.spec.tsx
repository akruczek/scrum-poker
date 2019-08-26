import * as React from 'react';
import renderer from 'react-test-renderer';
import { Text } from '@core/styled';
import { SpaceNameTooltip } from './space-name-tooltip';

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
