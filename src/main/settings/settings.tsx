import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { NavigationProps } from '../../core/navigation/navigation.model';
import { SettingsOverview } from '../../settings/settings';
import { ifElse } from '../../core/helpers';
import { Auth } from '../../auth/auth';
import { AUTH_TYPES } from '../../auth/models/auth.models';
import { HeaderRightIcon } from '../../core/components/header-right-icon/header-right-icon';
import { LanguageOverlay } from '../../settings/language-overlay/language-overlay';
import { LANGUAGE_CODES, TRANSLATIONS } from '../../core/models/translations.models';
import { translate } from '../../core/services/translations/translations.service';

interface StateProps {
  email: string;
  language: LANGUAGE_CODES;
}

export const _Settings = ({ email, language, navigation }: StateProps & NavigationProps) => {
  const [ isSelectingLanguage, toggleOverlay ] = React.useState(false);

  React.useEffect(() => {
    navigation.setParams({ toggleOverlay });
  }, []);

  return (
    <>
      {ifElse(
        email,
        <SettingsOverview navigation={navigation} />,
        <Auth type={AUTH_TYPES.LOGIN} />,
      )}
      <LanguageOverlay isVisible={isSelectingLanguage} currentLanguage={language} handleClose={() => toggleOverlay(false)} />
    </>
  );
};

_Settings.navigationOptions = ({ navigation }: NavigationProps) => ({
  title: translate(TRANSLATIONS.SETTINGS),
  headerRight: <HeaderRightIcon icon="language" onPress={() => navigation.getParam('toggleOverlay')(true)} />
});

const mapStateToProps = R.applySpec<StateProps>({
  email: R.path([ 'auth', 'model', 'email' ]),
  language: R.path([ 'translations', 'language' ]),
});

export const Settings = connect<StateProps, any, {}>(
  mapStateToProps, null,
)(_Settings);
