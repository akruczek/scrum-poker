import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { NavigationProps } from '../../../core/navigation/navigation.model';
import { Auth } from '../../../multi-poker/auth/auth';
import { Dashboard } from '../../../multi-poker/dashboard/dashboard';
import { AUTH_TYPES } from '../../../multi-poker/models/auth.models';

interface StateProps {
  email: string;
}

export class _MultiPlayer extends React.Component<NavigationProps & StateProps, {}> {
  static navigationOptions = {
    title: 'Multi Player',
  };

  render() {
    return this.props.email
      ? <Dashboard navigation={this.props.navigation} />
      : <Auth type={AUTH_TYPES.JOIN} />;
  }
}

const mapStateToProps = R.applySpec<StateProps>({
  email: R.path([ 'auth', 'model', 'email' ]),
});

export const MultiPlayer = connect<StateProps, any, {}>(
  mapStateToProps, null,
)(_MultiPlayer);

