import * as React from 'react';
import renderer, { act } from 'react-test-renderer';
import { CheckBox } from 'react-native-elements';
import * as T from '../../services/translations/translate';
import { Checkbox } from './checkbox-button';

describe('Checkbox', () => {
  beforeEach(() => {
    spyOn(T, 'translate').and.returnValue('Hello World!');
  });
  const onChange = jest.fn();

  describe('when Checkbox was mounted with all needed props', () => {
    const wrapper = renderer.create(
      <Checkbox title={'' as any} onChange={onChange} />
    );

    it('should render unchecked by default', () => {
      expect(wrapper.root.findByType(CheckBox).props.checked)
        .toBeFalsy();
    });

    it('should call onChange prop and change checked prop to true after call onPress prop', () => {
      act(() => {
        wrapper.root.findByType(CheckBox).props.onPress();
      });

      expect(onChange)
        .toHaveBeenCalled();
      expect(wrapper.root.findByType(CheckBox).props.checked)
        .toBeTruthy();
    });
  });
});
