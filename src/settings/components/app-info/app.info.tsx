import * as React from 'react';
import Constants from 'expo-constants';
import { Text, Container } from '@core/styled';
import { TEXT_SIZES, COLORS } from '@core/constants';
import * as pack from '../../../../package.json';

export const AppInfo = () => {
  const version = [
    `App Version: ${pack.version}`,
    `(build-${Constants.nativeBuildVersion})`,
  ].join(' ');

  const expoClient = `Expo Client: ${Constants.expoVersion}`;

  const device = `Device: ${Constants.deviceName} (${Constants.deviceYearClass})`;

  return (
    <Container margins="5px 5px 10px">
      <Text size={TEXT_SIZES.TINY} color={COLORS.GREY}>
        {version}
      </Text>
      <Text size={TEXT_SIZES.TINY} color={COLORS.GREY}>
        {expoClient}
      </Text>
      <Text size={TEXT_SIZES.TINY} color={COLORS.GREY}>
        {device}
      </Text>
    </Container>
  );
};
