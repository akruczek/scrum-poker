import * as React from 'react';
import * as Expo from 'expo';
import { Overlay, ListItem, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { LANGUAGE_CODES } from '../../core/models/translations.models';
import { setLanguage } from '../../core/services/translations/store/translations.actions';
import { ifElse } from '../../core/helpers';
import { Text } from '../../core/styled/text/text.styled';
import { Container } from '../../core/styled/container/container.styled';
import { TEXT_SIZES } from '../../core/styled/text/text.model';

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
    if (language === currentLanguage) {
      handleClose();
    } else {
      setLanguage(language);
      setReloadInformation(true);
    }
  };

  const handleReload = () => {
    Expo.Updates.reload();
  }

  return (
    <>
      <Overlay isVisible={reloadInformation} onBackdropPress={handleClose} height={160}>
        <Container justifyContent="space-around">
          <Text size={TEXT_SIZES.SMALL}>
            You need to reload App to see changes
          </Text>

          <Button title="Reload" onPress={handleReload} />
        </Container>
      </Overlay>

      <Overlay isVisible={isVisible && !reloadInformation} onBackdropPress={handleClose} height={140}>
        <>
          <ListItem title="English" onPress={() => handleChangeLanguage(LANGUAGE_CODES.EN)} />
          <ListItem title="Polski" onPress={() => handleChangeLanguage(LANGUAGE_CODES.PL)} />
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
