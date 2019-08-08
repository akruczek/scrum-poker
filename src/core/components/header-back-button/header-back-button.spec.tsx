import * as React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { HeaderBackButton } from './header-back-button';
import { SCREENS } from '../../navigation/screens';

describe('HeaderBackButton', () => {
  const navigation: any = {
    navigate: jest.fn(),
  };

  describe('when HeaderBackButton was mounted with all needed props', () => {
    const wrapper = renderer.create(
      <HeaderBackButton screen={SCREENS.RISK_POKER} navigation={navigation} />
    );

    it('should render Icon component wrapper with TouchableOpacity component', () => {
      expect(wrapper.root.findByType(TouchableOpacity).findByType(Icon))
        .toBeTruthy();
    });

    describe('and TouchableOpacity onPress prop was called', () => {
      beforeEach(() => {
        act(() => {
          wrapper.root.findByType(TouchableOpacity).props.onPress();
        });
      });

      it('should call navigation.navigate prop with given screen prop', () => {
        expect(navigation.navigate)
          .toHaveBeenCalledWith(SCREENS.RISK_POKER);
      });
    });
  });
});
