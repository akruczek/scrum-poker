import * as React from 'react';
import renderer from 'react-test-renderer';
import { ButtonsSet } from './buttons-set';
import { TRANSLATIONS } from '../../models';
import { View } from 'react-native';
import { COLORS } from '../../constants';
import { Button } from 'react-native-elements';
import { Separator } from '../../styled';
import { translate } from '../../services/translations/translate';

describe('ButtonsSet', () => {
  const apply = jest.fn();
  const dismiss = jest.fn();
  
  describe('when ButtonsSet was mounted', () => {
    const titles: any = [ TRANSLATIONS.APPLY, TRANSLATIONS.DISMISS ];
    const onPress: any = [ apply, dismiss ];
    const disabled: any = [ false, true ];

    const wrapper = renderer.create(
      <ButtonsSet titles={titles} onPress={onPress} disabled={disabled} />
    );
  
    it('should render View with white background', () => {
      expect(wrapper.root.findByType(View).props.style.backgroundColor)
        .toEqual(COLORS.WHITE);
    });

    it('should render 2 Buttons and 1 Separator', () => {
      expect(wrapper.root.findAllByType(Button).length)
        .toEqual(2);
      expect(wrapper.root.findAllByType(Separator).length)
        .toEqual(1);
    });

    it('should render Buttons with following values from title and onPress props', () => {
      const buttons = wrapper.root.findAllByType(Button);

      buttons.map((button: any, index: number) => {
        expect(button.props.title)
          .toEqual(translate(titles[index]));
        expect(button.props.onPress)
          .toEqual(onPress[index]);
        expect(button.props.disabled)
          .toEqual(disabled[index]);
      });
      expect(buttons[0])
    });
  });
});
