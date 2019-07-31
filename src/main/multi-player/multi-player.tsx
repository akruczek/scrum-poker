import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { NavigationProps } from '@core/navigation/navigation.model';
import { ifElse } from '@core/helpers';
import { translate } from '@core/services/translations/translations.service';
import { TRANSLATIONS } from '@core/models';
import { Dashboard } from '../../multi-poker/dashboard/dashboard';
import { Auth } from '../../auth/auth';
import { AUTH_TYPES } from '../../auth/models/auth.models';

interface StateProps {
  email: string;
}

export const _MultiPlayer = ({ email, navigation }: StateProps & NavigationProps) => ifElse(
  email,
  <Dashboard navigation={navigation} />,
  <Auth type={AUTH_TYPES.JOIN} />
);

_MultiPlayer.navigationOptions = () => ({
  title: translate(TRANSLATIONS.MULTI_PLAYER),
});

const mapStateToProps = R.applySpec<StateProps>({
  email: R.path([ 'auth', 'model', 'email' ]),
});

export const MultiPlayer = connect<StateProps, any, {}>(
  mapStateToProps, null,
)(_MultiPlayer);
