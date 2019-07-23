import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { NavigationProps } from '../../core/navigation/navigation.model';
import { Dashboard } from '../../multi-poker/dashboard/dashboard';
import { ifElse } from '../../core/helpers';
import { Auth } from '../../auth/auth';
import { AUTH_TYPES } from '../../auth/models/auth.models';

interface StateProps {
  email: string;
}

export class _MultiPlayer extends React.Component<StateProps & NavigationProps, {}> {
  static navigationOptions = {
    title: 'Multi Player',
  };
  
  render() {
    return ifElse(
      this.props.email,
      <Dashboard navigation={this.props.navigation} />,
      <Auth type={AUTH_TYPES.JOIN} />
    );
  }
};

const mapStateToProps = R.applySpec<StateProps>({
  email: R.path([ 'auth', 'model', 'email' ]),
});

export const MultiPlayer = connect<StateProps, any, {}>(
  mapStateToProps, null,
)(_MultiPlayer);
