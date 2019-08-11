import * as React from 'react';
import { View } from 'react-native';
import { Tooltip, Icon } from 'react-native-elements';
import { Separator } from '@core/styled';
import { translate } from '@core/services/translations/translations.service';
import { TRANSLATIONS } from '@core/models';
import { SpaceNameTooltip } from '../space-name-tooltip/space-name-tooltip';
import { JiraLoginInput } from '../jira-login-input/jira-login-input';
import { JiraTooltipContainer } from '../../styled/jira-tooltip-container/jira-tooltip-container.styled';

interface Props {
  spaceName: string;
  setSpaceName: (spaceName: string) => void;
}

export const SpaceNameInput = ({ spaceName, setSpaceName }: Props) => (
  <>
    <Separator />
    <View style={{ flexDirection: 'row' }}>
      <JiraLoginInput placeholder={translate(TRANSLATIONS.SPACE_NAME)} onChange={setSpaceName} value={spaceName} />

      <JiraTooltipContainer>
        <Tooltip popover={<SpaceNameTooltip />} width={260} height={60}>
          <Icon name="help" />
        </Tooltip>
      </JiraTooltipContainer>
    </View>
    <Separator />
  </>
);
