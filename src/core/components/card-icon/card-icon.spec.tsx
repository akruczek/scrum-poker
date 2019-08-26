import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { Button } from 'react-native-elements';
import { CardIcon } from './card-icon';

describe('CardIcon', () => {
  const handlePress = jest.fn();

  describe('when CardIcon was mounted without correct label prop', () => {
    const wrapper = renderer.create(
      <CardIcon value="risk_red" label={undefined as any} />
    );

    it('should render Button with "?" as title prop', () => {
      expect(wrapper.root.findByType(Button).props.title)
        .toEqual('?');
    });
  });

  describe('when CardIcon was mounted without handlePress prop', () => {
    const wrapper = renderer.create(
      <CardIcon value="risk_red" label={undefined as any} />
    );

    it('should call NOOP after press on Button', () => {
      renderer.act(() => {
        wrapper.root.findByType(Button).props.onPress();
      });

      expect(handlePress)
        .not.toHaveBeenCalled();
    });
  });

  describe('when CardIcon was mounted with correct handlePress prop', () => {
    const wrapper = renderer.create(
      <CardIcon value="risk_red" handlePress={handlePress} label={undefined as any} />
    );

    it('should call handlePress with given value after press on Button', () => {
      renderer.act(() => {
        wrapper.root.findByType(Button).props.onPress();
      });

      expect(handlePress)
        .toHaveBeenCalledWith('risk_red');
    });
  });
  
  describe('when CardIcon was mounted with all needed props', () => {
    const wrapper = renderer.create(
      <CardIcon value={1} label="1" handlePress={handlePress} />
    );

    it('should render Button component with specific props', () => {
      expect(wrapper.root.findByType(Button).props.title)
        .toEqual('1');
    });

    it('should render Button component with different fontSize based on given value', () => {
      let wrapper = renderer.create(
        <CardIcon value={100} label="100" handlePress={handlePress} />
      );

      expect(wrapper.root.findByType(Button).props.titleStyle.fontSize)
        .toEqual(16);

      wrapper = renderer.create(
        <CardIcon value={99} label="99" handlePress={handlePress} />
      );

      expect(wrapper.root.findByType(Button).props.titleStyle.fontSize)
        .toEqual(20);
    });
  });

  describe('when CardIcon was mounted without handlePress prop', () => {
    const wrapper = renderer.create(
      <CardIcon value={1} label="1" handlePress={undefined} />
    );

    it('should render Button component with NOOP function as onPress prop', () => {
      expect(wrapper.root.findByType(Button).props.onPress())
        .toEqual(null);
    });
  });

  describe('when CardIcon was mounted with risk card as value', () => {
    const wrapper = renderer.create(
      <CardIcon value="risk_red" label="red" />
    );

    it('should render with buttonStyle with display "none"', () => {
      expect(wrapper.root.findByType(Button).props.titleStyle.display)
        .toEqual('none');
    });
  });
});
