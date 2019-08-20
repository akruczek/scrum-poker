import * as React from 'react';
import * as Expo from 'expo';
import * as R from 'ramda';
import { Overlay, ListItem, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { LANGUAGE_CODES, TRANSLATIONS } from '@core/models';
import { translate } from '@core/services/translations/translate';
import { setLanguage } from '@core/services/translations/store/translations.actions';
import { Text, Container } from '@core/styled';
import { TEXT_SIZES } from '@core/constants';
import { getLanguageItemContent } from '../../helpers/get-language-item-content/get-language-item-content.helper';
import { changeLanguage } from './helpers/change-language.helper';

interface Props {
  isVisible: boolean;
  currentLanguage: LANGUAGE_CODES;
  handleClose: () => void;
}

interface DispatchProps {
  setLanguage: (code: LANGUAGE_CODES) => void;
}

export const _LanguageOverlay = ({ isVisible, currentLanguage, handleClose, setLanguage }: Props & DispatchProps) => {
  const [ reloadInformation, setReloadInformation ] = React.useState(false);

  const handleChangeLanguage = (language: LANGUAGE_CODES) => {
    changeLanguage(language, currentLanguage)(handleClose, setLanguage, setReloadInformation);
  };

  const handleReload = () => {
    Expo.Updates.reload();
  };

  return (
    <>
      <Overlay isVisible={reloadInformation} onBackdropPress={handleClose} height={160}>
        <Container justifyContent="space-around">
          <Text size={TEXT_SIZES.SMALL}>
            {translate(TRANSLATIONS.RELOAD_REQUEST)}
          </Text>

          <Button title={translate(TRANSLATIONS.RELOAD)} onPress={handleReload} />
        </Container>
      </Overlay>

      <Overlay isVisible={isVisible && !reloadInformation} onBackdropPress={handleClose} height={180}>
        <>
          {R.values(LANGUAGE_CODES).map(code => (
            <ListItem
                key={code}
                title={translate(getLanguageItemContent(code)('title'))}
                subtitle={translate(getLanguageItemContent(code)('subtitle'))}
                onPress={() => handleChangeLanguage(code)}
            />
          ))}
        </>
      </Overlay>
    </>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(
  { setLanguage, },
  dispatch,
);

export const LanguageOverlay = connect<any, DispatchProps, Props>(
  null, mapDispatchToProps,
)(_LanguageOverlay);
