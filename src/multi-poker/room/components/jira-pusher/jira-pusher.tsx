import * as React from 'react';
import * as R from 'ramda';
import { Modal } from 'react-native';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AppContainer, Container, ScrollContainer } from '@core/styled';
import { TRANSLATIONS, SetIssueStoryPointsPayload, PokerCard, JiraIssueModel } from '@core/models';
import { setIssueStoryPoints, clearJiraStatus, getProjectIssues } from '@core/services/jira/store/jira.actions'
import { ButtonsSet, StatusBarCover } from '@core/components';
import { JiraPusherForm } from '../jira-pusher-form/jira-pusher-form';
import { JiraPusherModals } from '../jira-pusher-modals/jira-pusher-modals';
import { useGetProjectIssues } from '../../hooks/get-project-issues/get-project-issues.hook';
import { useJiraPush } from '../../hooks/jira-push/jira-push.hook';
import { JiraPusherHeader } from '../jira-pusher-header/jira-pusher-header';

interface Props {
  handleClose: () => void;
  handleReset: () => void;
  estimationsList: PokerCard[];
}

interface DispatchProps {
  setIssueStoryPoints: (payload: SetIssueStoryPointsPayload) => void;
  clearJiraStatus: () => void;
  getProjectIssues: () => void;
}

interface StateProps {
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  issues: JiraIssueModel[];
}

export const _JiraPusher = ({
  isPending, isError, isSuccess, issues, estimationsList,
  handleClose, setIssueStoryPoints, clearJiraStatus, handleReset, getProjectIssues,
}: Props & DispatchProps & StateProps) => {
  const [ finalEstimation, setFinalEstimation ] = React.useState('');
  const [ issueKey, setIssueKey ] = React.useState('');
  const [ displaySuccess, displayError, handlePush ] =
    useJiraPush(issueKey, finalEstimation, isPending, isSuccess, isError)(
      setIssueStoryPoints, clearJiraStatus, handleClose, handleReset
    );

  useGetProjectIssues(getProjectIssues);

  return (
    <>
      <Modal animationType="slide">
        <StatusBarCover />
        <AppContainer>
          <ScrollContainer>
            <Container margins="10px 0">
              <JiraPusherHeader />
              <JiraPusherForm {...{ estimationsList, finalEstimation, issueKey, setFinalEstimation, setIssueKey, issues }} />
            </Container>
          </ScrollContainer>

          <ButtonsSet
              titles={[ TRANSLATIONS.PUSH, TRANSLATIONS.DISMISS ]}
              onPress={[ handlePush, handleClose ]}
          />
        </AppContainer>

        <JiraPusherModals {...{ isPending, displaySuccess, displayError }} />
      </Modal>
    </>
  );
};

const mapStateToProps = R.applySpec<StateProps>({
  isPending: R.path([ 'jira', 'isPending' ]),
  isSuccess: R.path([ 'jira', 'success' ]),
  isError: R.path([ 'jira', 'error' ]),
  issues: R.path([ 'jira', 'issues' ]),
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(
  { setIssueStoryPoints, clearJiraStatus, getProjectIssues },
  dispatch,
);

export const JiraPusher = connect<StateProps, DispatchProps, Props>(
  mapStateToProps, mapDispatchToProps,
)(_JiraPusher);
