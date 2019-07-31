import * as React from 'react';
import renderer from 'react-test-renderer';
import { ListItem as ListItemElement } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { CARDS } from '@core/constants';
import { ICON_SIZES } from '@core/models';
import { ListItem } from './list-item';
import riskPokerIcon from '../../../assets/custom-icons/risk-poker.png';

describe('ListItem', () => {
  const handlePress = jest.fn();
  const mockedPoker: any = {
    name: 'Test Poker',
    title: 'POKER',
    description: 'POKER description',
    icon: riskPokerIcon,
    cards: CARDS.STANDARD_POKER,
  };

  describe('when ListItem was mounted with all needed props', () => {
    const wrapper: any = renderer.create(
      <ListItem handlePress={handlePress} poker={mockedPoker} iconSize={ICON_SIZES.STANDARD} />,
    );

    it('should render 2 children', () => {
      expect(wrapper.root.children.length)
        .toEqual(2);
    });

    it('should render ListItemElement with expected props wrapped with TouchableOpacity', () => {
      expect(wrapper.root.findByType(TouchableOpacity).findByType(ListItemElement))
        .toBeTruthy();
    });

    it('should render ListItemElement with expected props', () => {
      const listItem = wrapper.root.findByType(ListItemElement);

      expect(listItem.props.title)
        .toEqual('Test Poker');

      expect(listItem.props.subtitle)
        .toEqual('POKER description');

      expect(listItem.props.rightIcon)
        .toEqual({ name: 'arrow-forward' });

      expect(listItem.props.leftElement.props.size)
        .toEqual(ICON_SIZES.STANDARD);

      expect(listItem.props.leftElement.props.source)
        .toEqual(riskPokerIcon);
    });
  });

  describe('when ListItem was mounted without iconSize prop', () => {
    const wrapper: any = renderer.create(
      <ListItem handlePress={handlePress} poker={mockedPoker} />,
    );

    it('should render ListItemElement with default (STANDARD) icon size', () => {
      const listItem = wrapper.root.findByType(ListItemElement);

      expect(listItem.props.leftElement.props.size)
        .toEqual(ICON_SIZES.STANDARD);
    });
  });
});
