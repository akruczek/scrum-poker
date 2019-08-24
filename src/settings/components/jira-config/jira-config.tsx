import * as React from 'react';
import * as R from 'ramda';
import { Modal } from 'react-native';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Text, ScrollContainer, AppContainer } from '@core/styled';
import { TEXT_SIZES } from '@core/constants';
import { JiraUserModel, TRANSLATIONS, JiraConfigurationModel } from '@core/models';
import { ButtonsSet } from '@core/components/buttons-set/buttons-set';
import { jiraSignOut, setJiraConfiguration } from '@core/services/jira/store/jira.actions';
import { translate } from '@core/services/translations/translate';
import { JiraConfigurationFields } from '@core/components/jira-configuration-fields/jira-configuration-fields';
import { JiraConfigBadge } from './components/jira-config-badge/jira-config-badge';

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
  const [ customField, setCustomField ] = React.useState('');
  const [ defaultIssueType, setDefaultIssueType ] = React.useState('')
  const [ defaultIssueStatus, setDefaultIssueStatus ] = React.useState('');

  React.useEffect(() => {
    setCustomField(R.propOr('', 'customField', jiraConfiguration));
    setDefaultIssueType(R.propOr('', 'defaultIssueType', jiraConfiguration));
    setDefaultIssueStatus(R.propOr('', 'defaultIssueStatus', jiraConfiguration));
  }, []);

  const handleLogout = () => {
    jiraSignOut();
    handleClose();
  };

  const handleApply = () => {
    if (customField) {
      setJiraConfiguration({ customField, defaultIssueType, defaultIssueStatus });
    }
  };

  return (
    <Modal animationType="slide">
      <AppContainer>
        <ScrollContainer>
          <Text size={TEXT_SIZES.BIG} margins="10px 0 0" align="center">
            {translate(TRANSLATIONS.JIRA_CONFIGURATION)}
          </Text>

          <JiraConfigBadge {...{ handleLogout, jiraUser }} />

          <JiraConfigurationFields {...{
              customField, setCustomField, defaultIssueType,
              setDefaultIssueType, defaultIssueStatus, setDefaultIssueStatus }}
          />
        </ScrollContainer>

        <ButtonsSet
            titles={[ TRANSLATIONS.APPLY, TRANSLATIONS.DISMISS ]}
            onPress={[ handleApply, handleClose ]}
        />
      </AppContainer>
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

