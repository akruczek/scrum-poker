import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { Ionicons } from '@expo/vector-icons';
import { TabBarIcon } from './tab-bar-icon';
import { COLORS, colors } from '../../constants/colors';

describe('TabBarIcon', () => {
  describe('when TabBarIcon was mounted with all needed props', () => {
    const wrapper = renderer.create(
      <TabBarIcon icon="ios-add" focused />
    );

    it('should render Ionicons component with specific icon and optional focused prop', () => {
      expect(wrapper.root.findByType(Ionicons).props.name)
        .toEqual('ios-add');
      expect(wrapper.root.findByType(Ionicons).props.color)
        .toEqual(colors[COLORS.TAB_ICON_SELECTED]);
    });
  });
});
