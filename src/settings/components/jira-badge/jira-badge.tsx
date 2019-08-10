import * as React from 'react';
import { Button, Avatar, Icon } from 'react-native-elements';
import { View } from 'react-native';
import jiraIcon from '@assets/custom-icons/jira.png';
import { JiraAuthModel, ICON_SIZES, TRANSLATIONS, JiraUserModel } from '@core/models';
import { COLORS, colors, TEXT_SIZES } from '@core/constants';
import { CustomIcon, Container, Text } from '@core/styled';
import { translate } from '@core/services/translations/translations.service';
import { isNotNil, NOOP } from '@core/helpers';
import { JiraLogin } from '../jira-login/jira-login';

interface Props {
  authJira: (payload: JiraAuthModel) => void;
  clearJiraStatus: () => void;
  jiraUser: JiraUserModel;
  isPending: boolean;
}

export const JiraBadge = ({ authJira, isPending, jiraUser, clearJiraStatus }: Props) => {
  const [ isSigningIn, setSigningIn ] = React.useState(false);

  const jiraIconComponent = (
    <View style={{ marginRight: 20 }}>
      <CustomIcon size={ICON_SIZES.STANDARD} source={jiraIcon} />
    </View>
  );

  const jiraContent = () => (
    <>
      <Container flexDirection="row" justifyContent="flex-start" margins="0 0 0 10px">
        <Avatar source={{ uri: jiraUser.avatarUrl }} rounded containerStyle={{ marginRight: 10 }} />
        <Text>{jiraUser.displayName}</Text>
      </Container>
      <Container flexDirection="row" justifyContent="flex-end" margins="0 10px 0 0">
        <CustomIcon size={ICON_SIZES.STANDARD} source={jiraIcon} />
      </Container>
    </>
  );

  return (
    <>
      <Button
          buttonStyle={{ height: 100, backgroundColor: colors[COLORS.WHITE] }}
          titleStyle={{ color: colors[COLORS.JIRA], fontSize: TEXT_SIZES.BIG, fontWeight: '600' }}
          raised
          title={jiraUser ? '' : translate(TRANSLATIONS.CONNECT_WITH_JIRA)}
          icon={jiraUser ? jiraContent() : jiraIconComponent}
          type="outline"
          onPress={() => jiraUser ? NOOP() : setSigningIn(true)}
      />
      {isSigningIn && (
        <JiraLogin
            isUser={isNotNil(jiraUser)}
            isPending={isPending}
            authJira={authJira}
            handleClose={() => setSigningIn(false)}
            clearJiraStatus={clearJiraStatus}
        />
      )}
    </>
  );
};
