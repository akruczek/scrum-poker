import * as React from 'react';
import { View } from 'react-native';
import { Tooltip, Icon } from 'react-native-elements';
import { Separator } from '@core/styled';
import { TokenTooltip } from '../token-tooltip/token-tooltip';
import { JiraLoginInput } from '../jira-login-input/jira-login-input';
import { JiraTooltipContainer } from '../../styled/jira-tooltip-container/jira-tooltip-container.styled';

interface Props {
  token: string;
  setToken: (token: string) => void;
}

export const TokenInput = ({ token, setToken }: Props) => (
  <>
    <Separator />
    <View style={{ flexDirection: 'row' }}>
      <JiraLoginInput placeholder="API token" onChange={setToken} value={token} isSecure />

      <JiraTooltipContainer>
        <Tooltip popover={<TokenTooltip />} width={260} height={60}>
          <Icon name="help" />
        </Tooltip>
      </JiraTooltipContainer>
    </View>
    <Separator />
  </>
);
