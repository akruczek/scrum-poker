import * as React from 'react';
import renderer from 'react-test-renderer';
import { Input } from 'react-native-elements';
import { CustomInput } from './custom-input';
import { Container, Text } from '../../styled';
import { translate } from '../../services/translations/translate';

describe('CustomInput', () => {
  const handleChange = jest.fn();

  describe('when CustomInput was mounted', () => {
    describe('and label prop is provided', () => {
      const wrapper = renderer.create(
        <CustomInput
            label="Hello"
            value=""
            placeholder="placeholder"
            handleChange={handleChange}
            centered
        />
      );

      it('should render Text and Input wrapped with Container', () => {
        const container = wrapper.root.findByType(Container);

        expect(container.findByType(Text))
          .toBeTruthy()
        expect(container.findByType(Input))
          .toBeTruthy();
      });
    });

    describe('and label, placeholder and centered props is not provided', () => {
      const wrapper = renderer.create(
        <CustomInput
            value=""
            handleChange={handleChange}
        />
      );

      it('should render only Input component', () => {
        expect(wrapper.root.children.length)
          .toEqual(1);
        expect(wrapper.root.findByType(Input))
          .toBeTruthy();
      });

      it('should render Input with empty string placeholder', () => {
        expect(wrapper.root.findByType(Input).props.placeholder)
          .toEqual(translate(''));
      });

      it('should render Input with empty object as inputStyle prop', () => {
        expect(wrapper.root.findByType(Input).props.inputStyle)
          .toEqual({});
      });
    });
  });
});
