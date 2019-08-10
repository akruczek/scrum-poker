import * as React from 'react';
import { Linking } from 'expo';
import { View } from 'react-native';
import { Input, Tooltip, Icon } from 'react-native-elements';
import { Separator, Text, Link } from '@core/styled';
import { TEXT_SIZES, COLORS } from '@core/constants';
import { translate } from '@core/services/translations/translations.service';
import { TRANSLATIONS } from '@core/models';

interface Props {
  token: string;
  setToken: (token: string) => void;
}

export const TokenInput = ({ token, setToken }: Props) => {
  const tokenHelp = (
    <Link onPress={() => Linking.openURL('https://confluence.atlassian.com/cloud/api-tokens-938839638.html')}>
      <Text decorationLine="underline" color={COLORS.WHITE} size={TEXT_SIZES.SMALL}>
        {translate(TRANSLATIONS.GENERATE_JIRA_TOKEN_HELP)}
      </Text>
    </Link>
  );

  return (
    <>
      <Separator />
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flexGrow: 9 }}>
          <Input secureTextEntry placeholder="API token" onChangeText={setToken} value={token} />
        </View>
        <View style={{ flexGrow: 1, alignItems: 'center', marginTop: 10 }}>
          <Tooltip popover={tokenHelp} width={260} height={60}>
            <Icon name="help" />
          </Tooltip>
        </View>
      </View>
      <Separator />
    </>
  );
};
