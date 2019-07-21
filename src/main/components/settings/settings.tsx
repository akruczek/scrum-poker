import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { AppContainer } from '../../../core/styled/app-container/app-container';
import { Auth } from '../../../multi-poker/auth/auth';
import { signOut } from '../../../multi-poker/auth/store/auth.actions';
import { ScrollContainer } from '../../../core/styled/scroll-container/scroll-container.styled';
import { Text } from '../../../core/styled/text/text.styled';
import { TEXT_SIZES } from '../../../core/styled/text/text.model';
import { Container } from '../../../core/styled/container/container.styled';
import { Button } from 'react-native-elements';
import { AUTH_TYPES } from '../../../multi-poker/models/auth.models';

interface StateProps {
  email: string;
}

interface DispatchProps {
  signOut: () => void;
}

export class _Settings extends React.Component<StateProps & DispatchProps, {}> {
  constructor(props: StateProps & DispatchProps) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  static navigationOptions = {
    title: 'Settings',
  };

  handleLogout() {
    this.props.signOut();
  }

  render() {
    return this.props.email ? (
      <AppContainer>
        <Container justifyContent="flex-end" margins="20px 0 0">
          <Button
              title="Logout"
              onPress={this.handleLogout}
              icon={{ name: 'exit-to-app', color: 'white' }}
              titleStyle={{ fontSize: 18 }}
          />
        </Container>
      </AppContainer>
    ) : (
      <Auth type={AUTH_TYPES.LOGIN} />
    );
  }
}

const mapStateToProps = R.applySpec<StateProps>({
  email: R.path([ 'auth', 'model', 'email' ]),
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(
  { signOut },
  dispatch,
);

export const Settings = connect<StateProps, any, {}>(
  mapStateToProps, mapDispatchToProps,
)(_Settings);
