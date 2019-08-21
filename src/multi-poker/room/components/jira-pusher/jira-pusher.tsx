import * as React from 'react';
import * as R from 'ramda';
import { Modal, View } from 'react-native';
import { Input } from 'react-native-elements';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AppContainer, Container, Text, Separator, KeyboardAvoidingContainer, ViewContainer, ScrollContainer } from '@core/styled';
import { TEXT_SIZES } from '@core/constants';
import { TRANSLATIONS, SetIssueStoryPointsPayload, PokerCard } from '@core/models';
import { translate } from '@core/services/translations/translate';
import { setIssueStoryPoints, clearJiraStatus } from '@core/services/jira/store/jira.actions'
import { Preloader, CardButton } from '@core/components';
import { ActionModal } from '@core/components/action-modal/action-modal';
import { ButtonsSet } from '@core/components/buttons-set/buttons-set';
import { jiraPusherUpdate } from '../../helpers/jira-pusher-update/jira-pusher-update.helper';
import { isBlank, isPresent } from '../../../../core/helpers';
import { JiraPusherForm } from '../jira-pusher-form/jira-pusher-form';
import { JiraPusherModals } from '../jira-pusher-modals/jira-pusher-modals';

interface Props {
  handleClose: () => void;
  handleReset: () => void;
  estimationsList: PokerCard[];
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
  handleClose, setIssueStoryPoints, isPending, isError, isSuccess, clearJiraStatus, handleReset, estimationsList,
}: Props & DispatchProps & StateProps) => {
  const [ finalEstimation, setFinalEstimation ] = React.useState('');
  const [ issueKey, setIssueKey ] = React.useState('');
  const [ displaySuccess, setSuccess ] = React.useState(false);
  const [ displayError, setError ] = React.useState(false);
  const [ waiting, setWaiting ] = React.useState(false);

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

              <JiraPusherForm {...{ estimationsList, finalEstimation, issueKey, setFinalEstimation, setIssueKey }} />
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
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(
  { setIssueStoryPoints, clearJiraStatus },
  dispatch,
);

export const JiraPusher = connect<StateProps, DispatchProps, Props>(
  mapStateToProps, mapDispatchToProps,
)(_JiraPusher);
