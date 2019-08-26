import * as React from 'react';
import * as R from 'ramda';
import { Modal } from 'react-native';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AppContainer, Container, Text, Separator, ScrollContainer } from '@core/styled';
import { TEXT_SIZES } from '@core/constants';
import { TRANSLATIONS, SetIssueStoryPointsPayload, PokerCard, JiraIssueModel } from '@core/models';
import { translate } from '@core/services/translations/translate';
import { setIssueStoryPoints, clearJiraStatus, getProjectIssues } from '@core/services/jira/store/jira.actions'
import { ButtonsSet } from '@core/components';
import { jiraPusherUpdate } from '../../helpers/jira-pusher-update/jira-pusher-update.helper';
import { JiraPusherForm } from '../jira-pusher-form/jira-pusher-form';
import { JiraPusherModals } from '../jira-pusher-modals/jira-pusher-modals';
import { useGetProjectIssues } from '../../hooks/get-project-issues/get-project-issues.hook';

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
  const [ displaySuccess, setSuccess ] = React.useState(false);
  const [ displayError, setError ] = React.useState(false);
  const [ waiting, setWaiting ] = React.useState(false);

  useGetProjectIssues(getProjectIssues);

  const handlePush = () => {
    setWaiting(true);
    setIssueStoryPoints({ issueKey, value: Number(finalEstimation) || 0 });
  };

  React.useEffect(() => {
    jiraPusherUpdate(isPending, waiting, isSuccess, isError)(
      setSuccess, setError, setWaiting, clearJiraStatus, handleClose, handleReset,
    );
  });

  return (
    <>
      <Modal animationType="slide">
        <AppContainer>
          <ScrollContainer>
            <Container margins="10px 0">
              <Text size={TEXT_SIZES.BIG} align="center">
                {translate(TRANSLATIONS.PUSH_TO_JIRA)}
              </Text>
              <Separator margin={10} />

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
