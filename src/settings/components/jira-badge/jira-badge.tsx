import * as React from 'react';
import { Button } from 'react-native-elements';
import { JiraAuthModel, TRANSLATIONS, JiraUserModel } from '@core/models';
import { COLORS, TEXT_SIZES } from '@core/constants';
import { translate } from '@core/services/translations/translations.service';
import { isNotNil, NOOP } from '@core/helpers';
import { JiraLogin } from '../jira-login/jira-login';
import { JiraBadgeContent } from './components/jira-badge-content/jira-badge-content';
import { JiraBadgeIcon } from './components/jira-badge-icon/jira-badge-icon';

interface Props {
  authJira: (payload: JiraAuthModel) => void;
  clearJiraStatus: () => void;
  jiraUser: JiraUserModel;
  isPending: boolean;
}

export const JiraBadge = ({ authJira, isPending, jiraUser, clearJiraStatus }: Props) => {
  const [ isSigningIn, setSigningIn ] = React.useState(false);

  const content = jiraUser ? <JiraBadgeContent jiraUser={jiraUser} /> : <JiraBadgeIcon />;
  const title = jiraUser ? '' : translate(TRANSLATIONS.CONNECT_WITH_JIRA);
  const handlePress = () => jiraUser ? NOOP() : setSigningIn(true);

  const buttonStyle = { height: 100, backgroundColor: COLORS.WHITE };
  const titleStyle: {} = { color: COLORS.JIRA, fontSize: TEXT_SIZES.BIG, fontWeight: '600' };

  return (
    <>
      <Button
          buttonStyle={buttonStyle}
          titleStyle={titleStyle}
          title={title}
          icon={content}
          type="outline"
          onPress={handlePress}
          raised
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
