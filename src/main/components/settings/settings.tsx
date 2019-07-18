import React from 'react';
import * as R from 'ramda';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { AppContainer } from '../../../core/styled/app-container/app-container';

interface StateProps {
  hasAccess: boolean;
}

interface DispatchProps {
  toggleCounterAccess: () => void;
}

export class _Settings extends React.Component<StateProps & DispatchProps, {}> {
  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    return (
      <AppContainer>
        <Text>Settings view</Text>
      </AppContainer>
    );
  }
}

const mapStateToProps = R.applySpec<StateProps>({
  hasAccess: R.path([ 'main', 'model', 'hasAccess' ]),
});

export const Settings = connect<StateProps, any, {}>(
  mapStateToProps, null,
)(_Settings);
