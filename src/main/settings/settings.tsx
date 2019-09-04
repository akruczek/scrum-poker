import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { ifElse } from '@core/helpers';
import { HeaderRightIcon } from '@core/components';
import { headerTitleStyle } from '@core/constants';
import { LANGUAGE_CODES, TRANSLATIONS, AUTH_TYPES, NavigationProps } from '@core/models';
import { translate } from '@core/services/translations/translate';
import { SettingsOverview } from '../../settings/settings';
import { Auth } from '../../auth/auth';
import { LanguageOverlay } from '../../settings/components/language-overlay/language-overlay';
import { useToggleOverlay } from './hooks/toggle-overlay/toggle-overlay.hook';

interface StateProps {
  email?: string;
  language: LANGUAGE_CODES;
}

export const _Settings = ({ email, language, navigation }: StateProps & NavigationProps) => {
  const [ isSelectingLanguage, toggleOverlay ] = useToggleOverlay(navigation);

  return (
    <>
      {ifElse(
        email,
        <SettingsOverview navigation={navigation} />,
        <Auth type={AUTH_TYPES.LOGIN} />,
      )}

      <LanguageOverlay
          isVisible={isSelectingLanguage}
          currentLanguage={language}
          handleClose={() => toggleOverlay(false)}
      />
    </>
  );
};

_Settings.navigationOptions = ({ navigation }: NavigationProps) => ({
  title: translate(TRANSLATIONS.SETTINGS),
  headerRight: <HeaderRightIcon icon="language" onPress={() => navigation.getParam('toggleOverlay')(true)} />,
  headerTitleStyle,
});

const mapStateToProps = R.applySpec<StateProps>({
  email: R.path([ 'auth', 'model', 'email' ]),
  language: R.path([ 'translations', 'language' ]),
});

export const Settings = connect<StateProps, any, {}>(
  mapStateToProps, null,
)(_Settings);
