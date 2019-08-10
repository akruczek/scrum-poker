import * as React from 'react';
import { Modal, ScrollView } from 'react-native';
import { Input, colors, Button } from 'react-native-elements';
import jiraIcon from '@assets/custom-icons/jira.png';
import { JiraAuthModel, TRANSLATIONS, ICON_SIZES } from '@core/models';
import { Container, Separator, AppContainer, Text, CustomIcon } from '@core/styled';
import { translate } from '@core/services/translations/translations.service';
import { TEXT_SIZES, COLORS } from '@core/constants';
import { SpaceNameInput } from './components/space-name-input/space-name-input';
import { TokenInput } from './components/token-input/token-input';
import { Preloader, ActionModal } from '@core/components';

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

  const allFieldsFilled = spaceName && email && token;

  const handleAuth = () => {
    if (allFieldsFilled) {
      authJira({ spaceName, email, token });
      setWaiting(true);
    }
  };

  React.useEffect(() => {
    if (allFieldsFilled && waiting) {
      if (!isPending && isUser) {
        setSuccess(true);
        clearJiraStatus();
        setTimeout(() => {
          handleClose();
        }, 2000);
      }
  
      if (!isPending && !isUser) {
        setError(true);
        clearJiraStatus();
        setTimeout(() => {
          setError(false);
          setWaiting(false);
        }, 3000);
      }
    }
  });

  return (
    <>
      <Modal animationType="slide">
        <AppContainer>
          <ScrollView contentContainerStyle={{ height: '80%' }}>
            <Container justifyContent="space-around" alignItems="center" margins="30px 0 0">
              <CustomIcon source={jiraIcon} size={ICON_SIZES.BIG} />

              <Text size={TEXT_SIZES.REGULAR} align="center">
                {translate(TRANSLATIONS.SIGN_IN_TO_JIRA)}
              </Text>

              <SpaceNameInput {...{ spaceName, setSpaceName }} />
              <Input placeholder="email" onChangeText={setEmail} value={email} />
              <TokenInput {...{ token, setToken }} />
            </Container>
          </ScrollView>

          <Container justifyContent="flex-end" style={{ backgroundColor: COLORS.WHITE, height: 100 }}>
            <Button
                title={translate(TRANSLATIONS.SIGN_IN)}
                onPress={handleAuth}
                disabled={!allFieldsFilled}
            />
            <Separator margin={10} />
            <Button
                buttonStyle={{ backgroundColor: colors.secondary }}
                title={translate(TRANSLATIONS.DISMISS)}
                onPress={handleClose}
            />
          </Container>
        </AppContainer>
      </Modal>

      {isPending && <Preloader />}
      {displaySuccess && <ActionModal type="success" message={TRANSLATIONS.JIRA_AUTH_SUCCESS} textSize={TEXT_SIZES.BIG} />}
      {displayError && <ActionModal type="error" message={TRANSLATIONS.JIRA_AUTH_ERROR} textSize={TEXT_SIZES.BIG} />}
    </>
  );
};
