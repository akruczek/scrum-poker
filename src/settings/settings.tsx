import * as React from 'react';
import * as R from 'ramda';
import { Button, colors } from 'react-native-elements';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { AppContainer, Container } from '@core/styled';
import { translate } from '@core/services/translations/translate';
import { TRANSLATIONS, JiraAuthModel, JiraUserModel } from '@core/models';
import { defaultFont } from '@core/constants';
import { signOut } from '../auth/store/auth.actions';
import { AppInfo } from './components/app-info/app-info';
import { authJira, clearJiraStatus } from '@core/services/jira/store/jira.actions';
import { JiraBadge } from './components/jira-badge/jira-badge';

interface DispatchProps {
  signOut: () => void;
  authJira: (payload: JiraAuthModel) => void;
  clearJiraStatus: () => void;
}

interface StateProps {
  isJiraPending: boolean;
  jiraUser: JiraUserModel;
}

export const _SettingsOverview = ({ signOut, authJira, isJiraPending, jiraUser }: DispatchProps & StateProps) => (
  <AppContainer>
    <Container justifyContent="flex-start" margins="10px 0 0">
      <JiraBadge authJira={authJira} isPending={isJiraPending} jiraUser={jiraUser} clearJiraStatus={clearJiraStatus} />
    </Container>

    <Container justifyContent="flex-end" margins="20px 0 0">
      <AppInfo />
      <Button
          title={translate(TRANSLATIONS.LOGOUT)}
          onPress={signOut}
          icon={{ name: 'exit-to-app', color: 'white' }}
          titleStyle={{ fontSize: 18, fontFamily: defaultFont }}
          buttonStyle={{ backgroundColor: colors.secondary }}
          raised
      />
    </Container>
  </AppContainer>
);

const mapStateToProps = R.applySpec<StateProps>({
  isJiraPending: R.path([ 'jira', 'isPending' ]),
  jiraUser: R.path([ 'jira', 'user' ]),
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(
  { signOut, authJira, clearJiraStatus },
  dispatch,
);

export const SettingsOverview = connect<{}, DispatchProps, {}>(
  mapStateToProps, mapDispatchToProps,
)(_SettingsOverview);
