import * as React from 'react';
import * as R from 'ramda';
import { Modal } from 'react-native';
import { Input } from 'react-native-elements';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AppContainer, Container, Text, Separator, KeyboardAvoidingContainer } from '@core/styled';
import { TEXT_SIZES } from '@core/constants';
import { TRANSLATIONS, SetIssueStoryPointsPayload } from '@core/models';
import { translate } from '@core/services/translations/translations.service';
import { setIssueStoryPoints, clearJiraStatus } from '@core/services/jira/store/jira.actions'
import { Preloader } from '@core/components';
import { ActionModal } from '@core/components/action-modal/action-modal';
import { ButtonsSet } from '@core/components/buttons-set/buttons-set';

interface Props {
  handleClose: () => void;
  handleReset: () => void;
}

interface DispatchProps {
  setIssueStoryPoints: (payload: SetIssueStoryPointsPayload) => void;
  clearJiraStatus: () => void;
}

interface StateProps {
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
}

export const _JiraPusher = ({
  handleClose, setIssueStoryPoints, isPending, isError, isSuccess, clearJiraStatus, handleReset,
}: Props & DispatchProps & StateProps) => {
  const [ finalEstimation, setFinalEstimation ] = React.useState('');
  const [ issueKey, setIssueKey ] = React.useState('');
  const [ displaySuccess, setSuccess ] = React.useState(false);
  const [ displayError, setError ] = React.useState(false);

  const handlePush = () => {
    setIssueStoryPoints({ issueKey, value: Number(finalEstimation) || 0 });
  };

  React.useEffect(() => {
    if (!isPending && isSuccess) {
      setSuccess(true);
      clearJiraStatus();
      setTimeout(() => {
        setSuccess(false);
        handleClose();
        handleReset();
      }, 2000);
    }

    if (!isPending && isError) {
      setError(true);
      clearJiraStatus();
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  });

  return (
    <>
      <Modal animationType="slide">
        <AppContainer>
          <KeyboardAvoidingContainer>
            <Container margins="10px 0">
              <Text size={TEXT_SIZES.BIG} align="center">
                {translate(TRANSLATIONS.PUSH_TO_JIRA)}
              </Text>
              <Separator margin={10} />
              <Input
                  value={finalEstimation}
                  placeholder={translate(TRANSLATIONS.FINAL_ESTIMATION)}
                  onChangeText={setFinalEstimation}
              />
              <Separator margin={10} />
              <Input
                  value={issueKey}
                  placeholder={translate(TRANSLATIONS.JIRA_ISSUE_KEY)}
                  onChangeText={setIssueKey}
              />
            </Container>

            <ButtonsSet
                titles={[ TRANSLATIONS.PUSH, TRANSLATIONS.DISMISS ]}
                onPress={[ handlePush, handleClose ]}
            />
          </KeyboardAvoidingContainer>
        </AppContainer>
      </Modal>

      {isPending && <Preloader />}
      {displaySuccess && <ActionModal type="success" message={TRANSLATIONS.JIRA_PUSH_SUCCESS} />}
      {displayError && <ActionModal type="error" message={TRANSLATIONS.JIRA_PUSH_ERROR} textSize={TEXT_SIZES.BIG} />}
    </>
  );
};

const mapStateToProps = R.applySpec<StateProps>({
  isPending: R.path([ 'jira', 'isPending' ]),
  isSuccess: R.path([ 'jira', 'success' ]),
  isError: R.path([ 'jira', 'error' ]),
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(
  { setIssueStoryPoints, clearJiraStatus },
  dispatch,
);

export const JiraPusher = connect<StateProps, DispatchProps, any>(
  mapStateToProps, mapDispatchToProps,
)(_JiraPusher);

