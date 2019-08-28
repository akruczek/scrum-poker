import * as React from 'react';
import renderer from 'react-test-renderer';
import { pokers } from '@core/constants';
import { CustomIcon } from '@core/styled';
import { ListedRoomIcon } from './listed-room-icon';
import { ICON_SIZES } from '../../../../core/models';

describe('ListedRoomIcon', () => {
  describe('when ListedRoomIcon was mounted with all needed props', () => {
    const wrapper = renderer.create(
      <ListedRoomIcon icon={pokers[0].icon} />
    );

    it('should render CustomIcon component with given icon and small icon size', () => {
      const customIcon = wrapper.root.findByType(CustomIcon);

      expect(customIcon.props.size)
        .toEqual(ICON_SIZES.SMALL);
      expect(customIcon.props.source)
        .toEqual(pokers[0].icon);
    });
  });
});
