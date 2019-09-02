import * as React from 'react';
import { Avatar } from 'react-native-elements';
import jiraIcon from '@assets/custom-icons/jira.png';
import { Container, Text, CustomIcon } from '@core/styled';
import { JiraUserModel, ICON_SIZES } from '@core/models';
import { TEXT_SIZES } from '@core/constants';

interface Props {
  jiraUser: JiraUserModel;
}

export const JiraBadgeContent = ({ jiraUser }: Props) => (
  <>
    <Container flexDirection="row" justifyContent="flex-start" margins="0 0 0 10px">
      <Avatar source={{ uri: jiraUser.avatarUrl }} rounded containerStyle={{ marginRight: 10 }} />
      <Text size={TEXT_SIZES.REGULAR}>{jiraUser.displayName}</Text>
    </Container>
    <Container flexDirection="row" justifyContent="flex-end" margins="0 10px 0 0">
      <CustomIcon size={ICON_SIZES.STANDARD} source={jiraIcon} />
    </Container>
  </>
);
