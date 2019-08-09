import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { CardIcon } from './card-icon';
import { Button, colors } from 'react-native-elements';
import { NOOP } from '../../helpers';

describe('CardIcon', () => {
  const handlePress = jest.fn();
  
  describe('when CardIcon was mounted with all needed props', () => {
    const wrapper = renderer.create(
      <CardIcon value={1} handlePress={handlePress} />
    );

    it('should render Button component with specific props', () => {
      const expectedProps = {
        title: '1',
        buttonStyle: {
          width: 45,
          height: 45,
          backgroundColor: colors.primary,
          padding: 5,
        },
        titleStyle: {
          fontSize: 20,
          display: 'flex',
          fontFamily: 'space-mono',
        },
        onPress: handlePress,
      };
      
      expect(wrapper.root.findByType(Button).props)
        .toEqual(expectedProps);
    });

    it('should render Button component with different fontSize based on given value', () => {
      let wrapper = renderer.create(
        <CardIcon value={100} handlePress={handlePress} />
      );

      expect(wrapper.root.findByType(Button).props.titleStyle.fontSize)
        .toEqual(16);

      wrapper = renderer.create(
        <CardIcon value={99} handlePress={handlePress} />
      );

      expect(wrapper.root.findByType(Button).props.titleStyle.fontSize)
        .toEqual(20);
    });
  });

  describe('when CardIcon was mounted without onPress prop', () => {
    const wrapper = renderer.create(
      <CardIcon value={1} />
    );

    it('should render Button component with NOOP function as onPress prop', () => {
      expect(wrapper.root.findByType(Button).props.onPress)
        .toEqual(NOOP);
    });
  });

  describe('when CardIcon was mounted with risk card as value', () => {
    const wrapper = renderer.create(
      <CardIcon value="risk_red" />
    );

    it('should render with buttonStyle with display "none"', () => {
      expect(wrapper.root.findByType(Button).props.titleStyle.display)
        .toEqual('none');
    });
  });
});
