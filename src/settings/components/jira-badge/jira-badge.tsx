import * as React from 'react';
import { Button } from 'react-native-elements';
import { JiraAuthModel, TRANSLATIONS, JiraUserModel } from '@core/models';
import { COLORS, TEXT_SIZES, defaultFont } from '@core/constants';
import { translate } from '@core/services/translations/translate';
import { isNotNil, _cond } from '@core/helpers';
import { JiraLogin } from '../jira-login/jira-login';
import { JiraBadgeContent } from './components/jira-badge-content/jira-badge-content';
import { JiraBadgeIcon } from './components/jira-badge-icon/jira-badge-icon';
import { JiraConfig } from '../jira-config/jira-config';

interface Props {
  authJira: (payload: JiraAuthModel) => void;
  clearJiraStatus: () => void;
  jiraUser: JiraUserModel;
  isPending: boolean;
  email: string;
}

export const JiraBadge = ({ authJira, isPending, jiraUser, clearJiraStatus, email }: Props) => {
  const [ isSigningIn, setSigningIn ] = React.useState(false);
  const [ isEditingConfig, setEditingConfig ] = React.useState(false);

  const content = jiraUser ? <JiraBadgeContent jiraUser={jiraUser} /> : <JiraBadgeIcon />;
  const title = jiraUser ? '' : translate(TRANSLATIONS.CONNECT_WITH_JIRA);
  const handlePress = () => jiraUser ? setEditingConfig(true) : setSigningIn(true);

  const buttonStyle = { height: 100, backgroundColor: COLORS.WHITE };
  const titleStyle: {} = { color: COLORS.JIRA, fontSize: TEXT_SIZES.BIG, fontFamily: defaultFont };

  return (
    <>
      <Button
          buttonStyle={buttonStyle}
          title={title}
          titleStyle={titleStyle}
          icon={content}
          type="outline"
          onPress={handlePress}
          raised
      />

      {_cond(
        isSigningIn, (
          <JiraLogin
              isUser={isNotNil(jiraUser)}
              isPending={isPending}
              authJira={authJira}
              handleClose={() => setSigningIn(false)}
              clearJiraStatus={clearJiraStatus}
              defaultEmail={email}
          />
        ),
        isEditingConfig, (
          <JiraConfig
              jiraUser={jiraUser}
              handleClose={() => setEditingConfig(false)}
          />
        ),
      )}
    </>
  );
};
