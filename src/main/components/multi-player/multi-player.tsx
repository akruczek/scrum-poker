import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { NavigationProps } from '../../../core/navigation/navigation.model';
import { Firebase } from '../../../core/services/firebase/firebase.service';
import { Auth } from '../../../multi-poker/auth/auth';
import { Dashboard } from '../../../multi-poker/dashboard/dashboard';

interface StateProps {
  token: string | null;
}

export class _MultiPlayer extends React.Component<NavigationProps & StateProps, {}> {
  static navigationOptions = {
    title: 'Multi Player',
  };

  componentDidMount() {
    Firebase.initialize();
  }

  render() {
    return this.props.token ? (
      <Dashboard />
    ) : (
      <Auth />
    );
  }
}

const mapStateToProps = R.applySpec<StateProps>({
  token: R.path([ 'firebase', 'model', 'token' ]),
});

export const MultiPlayer = connect<StateProps, any, {}>(
  mapStateToProps, null,
)(_MultiPlayer);

