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

              <Container alignItems="center" justifyContent="flex-start" alignContent="flex-start">
                <Text margins="0 0 10px" children={translate(TRANSLATIONS.TYPE_FINAL_ESTIMATION)} />
                <Input
                    value={finalEstimation}
                    placeholder={translate(TRANSLATIONS.FINAL_ESTIMATION)}
                    onChangeText={setFinalEstimation}
                    inputStyle={{ textAlign: 'center', fontSize: TEXT_SIZES.BIG }}
                />
                <Separator margin={10} />

                {isPresent(estimationsList) && (
                  <>
                    <Text margins="0 0 10px" children={translate(TRANSLATIONS.OR_CHOOSE)} />
                    <ViewContainer direction="row">
                      {estimationsList.map(card => (
                        <ViewContainer key={card.value} margins="0 5px">
                          <CardButton card={card} handleSelect={() => setFinalEstimation(String(card.value))} />
                        </ViewContainer>
                      ))}
                    </ViewContainer>
                  </>
                )}

                <Separator margin={10} />
                <Text margins="0 0 10px" children={translate(TRANSLATIONS.ISSUE_KEY)} />
                <Input
                    value={issueKey}
                    placeholder={translate(TRANSLATIONS.JIRA_ISSUE_KEY)}
                    onChangeText={setIssueKey}
                    inputStyle={{ textAlign: 'center', fontSize: TEXT_SIZES.BIG }}
                />
              </Container>
            </Container>
          </ScrollContainer>

          <ButtonsSet
              titles={[ TRANSLATIONS.PUSH, TRANSLATIONS.DISMISS ]}
              onPress={[ handlePush, handleClose ]}
          />
        </AppContainer>

        <Preloader isVisible={isPending} />
        <ActionModal isVisible={displaySuccess} type="success" message={TRANSLATIONS.JIRA_PUSH_SUCCESS} />
        <ActionModal isVisible={displayError} type="error" message={TRANSLATIONS.JIRA_PUSH_ERROR} textSize={TEXT_SIZES.BIG} />
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

