import * as React from 'react';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { AppContainer, Container } from '@core/styled';
import { translate } from '@core/services/translations/translations.service';
import { TRANSLATIONS } from '@core/models';
import { signOut } from '../auth/store/auth.actions';
import { AppInfo } from './components/app-info/app.info';

interface DispatchProps {
  signOut: () => void;
}

export const _SettingsOverview = (props: DispatchProps) => (
  <AppContainer>
    <AppInfo />
    <Container justifyContent="flex-end" margins="20px 0 0">
      <Button
          title={translate(TRANSLATIONS.LOGOUT)}
          onPress={props.signOut}
          icon={{ name: 'exit-to-app', color: 'white' }}
          titleStyle={{ fontSize: 18 }}
      />
    </Container>
  </AppContainer>
);

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(
  { signOut },
  dispatch,
);

export const SettingsOverview = connect<{}, DispatchProps, {}>(
  null, mapDispatchToProps,
)(_SettingsOverview);
