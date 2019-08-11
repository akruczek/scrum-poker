import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { Ionicons } from '@expo/vector-icons';
import { TabBarIcon } from './tab-bar-icon';
import { COLORS } from '../../constants/colors';

describe('TabBarIcon', () => {
  describe('when TabBarIcon was mounted with all needed props', () => {
    const wrapper = renderer.create(
      <TabBarIcon icon="ios-add" focused />
    );

    it('should render Ionicons component with specific icon and optional focused prop', () => {
      expect(wrapper.root.findByType(Ionicons).props.name)
        .toEqual('ios-add');
      expect(wrapper.root.findByType(Ionicons).props.color)
        .toEqual(COLORS.TAB_ICON_SELECTED);
    });
  });

  describe('when focused prop is true', () => {
    const wrapper = renderer.create(
      <TabBarIcon icon="ios-add" focused />
    );

    it('should render Ionicons with TAB_ICON_SELECTED color prop', () => {
      expect(wrapper.root.findByType(Ionicons).props.color)
        .toEqual(COLORS.TAB_ICON_SELECTED);
    });
  });

  describe('when focused prop is false', () => {
    const wrapper = renderer.create(
      <TabBarIcon icon="ios-add" focused={false} />
    );

    it('should render Ionicons with TAB_ICON_DEFAULT color prop', () => {
      expect(wrapper.root.findByType(Ionicons).props.color)
        .toEqual(COLORS.TAB_ICON_DEFAULT);
    });
  });
});
