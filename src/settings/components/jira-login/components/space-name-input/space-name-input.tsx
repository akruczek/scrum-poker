import * as React from 'react';
import * as R from 'ramda';
import { View } from 'react-native';
import { Input, Tooltip, Icon } from 'react-native-elements';
import { Separator, Text } from '@core/styled';
import { TEXT_SIZES, COLORS } from '@core/constants';
import { translate } from '../../../../../core/services/translations/translations.service';
import { TRANSLATIONS } from '../../../../../core/models';

interface Props {
  spaceName: string;
  setSpaceName: (spaceName: string) => void;
}

export const SpaceNameInput = ({ spaceName, setSpaceName }: Props) => {
  const spaceNameHelp = (
    <Text>
      <Text size={TEXT_SIZES.SMALL} color={COLORS.RED_CARD}>
        {R.toLower(R.replace(/ /, '_', translate(TRANSLATIONS.SPACE_NAME)))}
      </Text>
      <Text size={TEXT_SIZES.SMALL}>.atlassian.net</Text>
    </Text>
  );

  return (
    <>
      <Separator />
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flexGrow: 9 }}>
          <Input placeholder={translate(TRANSLATIONS.SPACE_NAME)} onChangeText={setSpaceName} value={spaceName} />
        </View>
        <View style={{ flexGrow: 1, alignItems: 'center', marginTop: 10 }}>
          <Tooltip popover={spaceNameHelp} width={260} height={60}>
            <Icon name="help" />
          </Tooltip>
        </View>
      </View>
      <Separator />
    </>
  );
};
