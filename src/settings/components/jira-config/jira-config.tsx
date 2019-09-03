import * as React from 'react';
import * as R from 'ramda';
import { Modal, View } from 'react-native';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ScrollContainer, AppContainer } from '@core/styled';
import { JiraUserModel, TRANSLATIONS, JiraConfigurationModel } from '@core/models';
import { ButtonsSet, JiraConfigurationFields, ActionModal, StatusBarCover } from '@core/components';
import { jiraSignOut, setJiraConfiguration } from '@core/services/jira/store/jira.actions';
import { JiraConfigBadge } from './components/jira-config-badge/jira-config-badge';
import { useSetJiraConfiguration } from '../../hooks/set-jira-configuration/set-jira-configuration.hook';
import { JiraConfigHeader } from './components/jira-config-header/jira-config-header';

interface Props {
  jiraUser: JiraUserModel;
  handleClose: () => void;
}

interface DispatchProps {
  jiraSignOut: () => void;
  setJiraConfiguration: (payload: JiraConfigurationModel) => void;
}

interface StateProps {
  jiraConfiguration: JiraConfigurationModel;
}

export const _JiraConfig = ({
  jiraUser, jiraConfiguration, handleClose, jiraSignOut, setJiraConfiguration,
}: Props & DispatchProps & StateProps) => {
  const [ isSuccess, isDirty, fields, setters, handleApply ] =
    useSetJiraConfiguration(jiraConfiguration, setJiraConfiguration, handleClose);

  const handleLogout = () => {
    jiraSignOut();
    handleClose();
  };

  return (
    <Modal animationType="slide">
      <StatusBarCover />
      <AppContainer>
        <ScrollContainer>
          <JiraConfigHeader />
          <JiraConfigBadge {...{ handleLogout, jiraUser }} />
          <JiraConfigurationFields {...{ ...fields, ...setters }} />
        </ScrollContainer>

        <ButtonsSet
            titles={[ TRANSLATIONS.APPLY, TRANSLATIONS.DISMISS ]}
            onPress={[ handleApply, handleClose ]}
            disabled={[ !isDirty, false ]}
        />
      </AppContainer>

      {isSuccess && (
        <ActionModal type="success" message={TRANSLATIONS.JIRA_UPDATE_CONFIG_SUCCESS} />
      )}
    </Modal>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(
  { jiraSignOut, setJiraConfiguration },
  dispatch,
);

const mapStateToProps = R.applySpec<StateProps>({
  jiraConfiguration: R.path([ 'jira', 'configuration' ]),
});

export const JiraConfig = connect<StateProps, DispatchProps, Props>(
  mapStateToProps, mapDispatchToProps,
)(_JiraConfig);
