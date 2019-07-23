import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { NavigationProps } from '../../core/navigation/navigation.model';
import { SettingsOverview } from '../../settings/settings';
import { ifElse } from '../../core/helpers';
import { Auth } from '../../auth/auth';
import { AUTH_TYPES } from '../../auth/models/auth.models';

interface StateProps {
  email: string;
}

export class _Settings extends React.Component<StateProps & NavigationProps, {}> {
  static navigationOptions = {
    title: 'Settings',
  };
  
  render() {
    return ifElse(
      this.props.email,
      <SettingsOverview navigation={this.props.navigation} />,
      <Auth type={AUTH_TYPES.LOGIN} />,
    );
  }
};

const mapStateToProps = R.applySpec<StateProps>({
  email: R.path([ 'auth', 'model', 'email' ]),
});

export const Settings = connect<StateProps, any, {}>(
  mapStateToProps, null,
)(_Settings);
