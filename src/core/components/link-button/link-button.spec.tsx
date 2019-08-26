import * as React from 'react';
import renderer, { act } from 'react-test-renderer';
import { LinkButton } from './link-button';
import { TRANSLATIONS } from '../../models';
import { Button } from 'react-native-elements';
import { translate } from '../../services/translations/translate';

describe('LinkButton', () => {
  const handlePress = jest.fn();

  describe('when LinkButton was mounted with all needed props', () => {
    const wrapper = renderer.create(
      <LinkButton title={TRANSLATIONS.APPLY} handlePress={handlePress} />
    );

    it('should render Button with given title', () => {
      expect(wrapper.root.findByType(Button).props.title)
        .toEqual(translate(TRANSLATIONS.APPLY));
    });

    it('should call handlePress after press on Button', () => {
      act(() => {
        wrapper.root.findByType(Button).props.onPress();
      });

      expect(handlePress)
        .toHaveBeenCalled();
    });
  });
});
