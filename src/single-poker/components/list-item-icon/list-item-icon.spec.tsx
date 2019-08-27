import * as React from 'react';
import renderer from 'react-test-renderer';
import { pokers } from '@core/constants';
import { ICON_SIZES } from '@core/models';
import { CustomIcon } from '@core/styled';
import { ListItemIcon } from './list-item-icon';

describe('ListItemIcon', () => {
  describe('when ListItemIcon was mounted with all needed props', () => {
    const wrapper = renderer.create(
      <ListItemIcon poker={pokers[0]} iconSize={ICON_SIZES.BIG} />
    );

    it('should render CustomIcon component with poker icon as source prop', () => {
      expect(wrapper.root.findByType(CustomIcon).props.source)
        .toEqual(pokers[0].icon);
    });
  });

  describe('when ListItemIcon was mounted without iconSize prop', () => {
    const wrapper = renderer.create(
      <ListItemIcon poker={pokers[0]} />
    );

    it('should render CustomIcon component with standard size', () => {
      expect(wrapper.root.findByType(CustomIcon).props.size)
        .toEqual(ICON_SIZES.STANDARD);
    });
  });
});
