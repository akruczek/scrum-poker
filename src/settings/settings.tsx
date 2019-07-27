import * as React from 'react';
import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { AppContainer } from '../core/styled/app-container/app-container';
import { Container } from '../core/styled/container/container.styled';
import { signOut } from '../auth/store/auth.actions';
import { NavigationProps } from '../core/navigation/navigation.model';

interface DispatchProps {
  signOut: () => void;
}

export const _SettingsOverview = (props: DispatchProps & NavigationProps) => (
  <AppContainer>
    <Container justifyContent="flex-end" margins="20px 0 0">
      <Button
          title="Logout"
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
