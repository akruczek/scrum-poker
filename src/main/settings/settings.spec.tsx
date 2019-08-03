import * as React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import { LANGUAGE_CODES, TRANSLATIONS } from '@core/models';
import { translate } from '@core/services/translations/translations.service';
import { HeaderRightIcon } from '@core/components';
import { _Settings, Settings } from './settings';
import { SettingsOverview } from '../../settings/settings';
import { appStore } from '../../store/configure-store';
import { Auth } from '../../auth/auth';
import { LanguageOverlay } from '../../settings/language-overlay/language-overlay';

describe('Settings', () => {
  const mockedNavigation: any = {
    navigate: jest.fn(),
    getParam: () => () => 'param',
    setParams: () => {},
  };

  describe('when Settings was mounted with all needed props', () => {
    const wrapper = renderer.create(
      <Provider store={appStore}>
        <_Settings email="test@example.com" language={LANGUAGE_CODES.PL} navigation={mockedNavigation} />
      </Provider>
    );

    it('should render SettingsOverview component', () => {
      expect(wrapper.root.findByType(SettingsOverview))
        .toBeTruthy();
    });

    it('should render with TRANSLATIONS.SETTINGS title', () => {
      expect(Settings.navigationOptions({ navigation: mockedNavigation }).title)
        .toEqual(translate(TRANSLATIONS.SETTINGS));
    });

    it('should render HeaderRightIcon component on right side of navigation header', () => {
      expect(Settings.navigationOptions({ navigation: mockedNavigation }).headerRight.type)
        .toEqual(HeaderRightIcon);
    });

    describe('and user press on HeaderRightIcon', () => {
      act(() => {
        const headerIcon = Settings.navigationOptions({ navigation: mockedNavigation }).headerRight;
        headerIcon.props.onPress();
      });

      it('should render LanguageOverlay with current language prop', () => {  
        expect(wrapper.root.findByType(LanguageOverlay))
          .toBeTruthy();
        expect(wrapper.root.findByType(LanguageOverlay).props.currentLanguage)
          .toEqual(LANGUAGE_CODES.PL);
      });

      it('should hide LanguageOverlay after call LanguageOverlay handleClose prop', () => {
        act(() => {
          wrapper.root.findByType(LanguageOverlay).props.handleClose();
        });

        expect(wrapper.root.findByType(LanguageOverlay).props.isVisible)
          .toBeFalsy();
      });
    });
  });
  
  describe('when Settings was mounted without email prop', () => {
    const wrapper = renderer.create(
      <Provider store={appStore}>
        <_Settings language={LANGUAGE_CODES.PL} navigation={mockedNavigation} />
      </Provider>
    );

    it('should render Auth component', () => {
      expect(wrapper.root.findByType(Auth))
        .toBeTruthy();
    });
  });
});
