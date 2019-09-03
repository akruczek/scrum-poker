import * as React from 'react';
import { Modal } from 'react-native';
import { Input } from 'react-native-elements';
import jiraIcon from '@assets/custom-icons/jira.png';
import { JiraAuthModel, TRANSLATIONS, ICON_SIZES } from '@core/models';
import { Container, AppContainer, Text, CustomIcon, KeyboardAvoidingContainer } from '@core/styled';
import { translate } from '@core/services/translations/translate';
import { TEXT_SIZES, defaultFont } from '@core/constants';
import { Preloader, ActionModal, ButtonsSet, StatusBarCover } from '@core/components';
import { isPlatform } from '@core/helpers';
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

  const offset = isPlatform('android') ? 0 : 10;

  return (
    <>
      <Modal animationType="slide">
        <StatusBarCover />
        <AppContainer>
          <KeyboardAvoidingContainer keyboardVerticalOffset={offset}>
            <Container justifyContent="space-around" alignItems="center" margins="30px 0 0">
              <CustomIcon source={jiraIcon} size={ICON_SIZES.BIG} />

              <Text size={TEXT_SIZES.REGULAR} align="center">
                {translate(TRANSLATIONS.SIGN_IN_TO_JIRA)}
              </Text>

              <SpaceNameInput {...{ spaceName, setSpaceName }} />
              <Input
                  placeholder="email"
                  onChangeText={setEmail}
                  value={email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  inputStyle={{ fontFamily: defaultFont }}
              />
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
