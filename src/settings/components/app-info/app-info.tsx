import * as React from 'react';
import Constants from 'expo-constants';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { TEXT_SIZES, COLORS } from '@core/constants';
import * as pack from '../../../../package.json';

export const AppInfo = () => {
  const version = [
    `App Version: ${pack.version}`,
    `(build ${Constants.nativeBuildVersion})`,
  ].join(' ');

  const expoClient = `Expo Client: ${Constants.expoVersion}`;

  const device = `Device: ${Constants.deviceName} (${Constants.deviceYearClass})`;

  return (
    <View style={{ marginTop: 10, marginBottom: 10 }}>
      <Button
          title={`${version}\n${expoClient}\n${device}`}
          titleStyle={{ fontSize: TEXT_SIZES.TINY, color: COLORS.GREY }}
          buttonStyle={{ backgroundColor: COLORS.LIGHT_GREY }}
          type="solid"
      />
    </View>
  );
};
