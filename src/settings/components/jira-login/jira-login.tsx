import * as React from 'react';
import { Modal } from 'react-native';
import { Input } from 'react-native-elements';
import jiraIcon from '@assets/custom-icons/jira.png';
import { JiraAuthModel, TRANSLATIONS, ICON_SIZES } from '@core/models';
import { Container, AppContainer, Text, CustomIcon, KeyboardAvoidingContainer } from '@core/styled';
import { translate } from '@core/services/translations/translate';
import { TEXT_SIZES } from '@core/constants';
import { Preloader, ActionModal } from '@core/components';
import { ButtonsSet } from '@core/components/buttons-set/buttons-set';
import { SpaceNameInput } from './components/space-name-input/space-name-input';
import { TokenInput } from './components/token-input/token-input';
import { jiraLoginUpdate } from './helpers/jira-login-update/jira-login-update.helper';
import { handleJiraAuth } from './helpers/handle-jira-auth/handle-jira-auth.helper';

interface Props {
  authJira: (payload: JiraAuthModel) => void;
  handleClose: () => void;
  clearJiraStatus: () => void;
  isPending: boolean;
  isUser: boolean;
}

export const JiraLogin = ({ authJira, handleClose, isPending, isUser, clearJiraStatus }: Props) => {
  const [ spaceName, setSpaceName ] = React.useState('');
  const [ email, setEmail ] = React.useState('');
  const [ token, setToken ] = React.useState('');
  const [ waiting, setWaiting ] = React.useState(false);
  const [ displaySuccess, setSuccess ] = React.useState(false);
  const [ displayError, setError ] = React.useState(false);

  const allFieldsFilled = !!(spaceName && email && token);

  const handleAuth = () => {
    handleJiraAuth(allFieldsFilled)(spaceName, email, token)(authJira, setWaiting);
  };

  React.useEffect(() => {
    jiraLoginUpdate(allFieldsFilled, waiting, displaySuccess, displayError, isPending, isUser)(
      setSuccess, setError, setWaiting, handleClose, clearJiraStatus,
    );
  });

  return (
    <>
      <Modal animationType="slide">
        <AppContainer>
          <KeyboardAvoidingContainer>
            <Container justifyContent="space-around" alignItems="center" margins="30px 0 0">
              <CustomIcon source={jiraIcon} size={ICON_SIZES.BIG} />

              <Text size={TEXT_SIZES.REGULAR} align="center">
                {translate(TRANSLATIONS.SIGN_IN_TO_JIRA)}
              </Text>

              <SpaceNameInput {...{ spaceName, setSpaceName }} />
              <Input placeholder="email" onChangeText={setEmail} value={email} />
              <TokenInput {...{ token, setToken }} />
            </Container>

            <ButtonsSet
                titles={[ TRANSLATIONS.SIGN_IN, TRANSLATIONS.DISMISS ]}
                onPress={[ handleAuth, handleClose ]}
                disabled={[ !allFieldsFilled, false ]}
            />
          </KeyboardAvoidingContainer>
        </AppContainer>

        {isPending && <Preloader />}
        {displaySuccess && <ActionModal type="success" message={TRANSLATIONS.JIRA_AUTH_SUCCESS} textSize={TEXT_SIZES.BIG} />}
        {displayError && <ActionModal type="error" message={TRANSLATIONS.JIRA_AUTH_ERROR} textSize={TEXT_SIZES.BIG} />}
      </Modal>
    </>
  );
};
