import * as React from 'react';
import { Avatar, Button } from 'react-native-elements';
import { Separator, Container, Text } from '@core/styled';
import { translate } from '@core/services/translations/translate';
import { TRANSLATIONS, JiraUserModel } from '@core/models';
import { TEXT_SIZES, defaultFont } from '@core/constants';

interface Props {
  handleLogout: () => void;
  jiraUser: JiraUserModel;
}

export const JiraConfigBadge = ({ handleLogout, jiraUser }: Props) => (
  <>
    <Separator margin={10} />

    <Container flexDirection="row" alignItems="center">
      <Container flexDirection="row" justifyContent="flex-start">
        <Avatar source={{ uri: jiraUser.avatarUrl }} rounded />
        <Text size={TEXT_SIZES.REGULAR} margins="0 0 0 10px" children={jiraUser.displayName} />
      </Container>

      <Container flexDirection="row" justifyContent="flex-end">
        <Button
            title={translate(TRANSLATIONS.LOGOUT)}
            icon={{ name: 'exit-to-app', color: 'white' }}
            onPress={handleLogout}
            titleStyle={{ fontFamily: defaultFont }}
        />
      </Container>
    </Container>

    <Separator margin={10} />
  </>
);
