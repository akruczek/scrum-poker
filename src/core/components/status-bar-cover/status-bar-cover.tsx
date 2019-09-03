import * as React from 'react';
import { View } from 'react-native';
import { ifElse, isPlatform } from '../../helpers';

export const StatusBarCover = () => ifElse(
  isPlatform('ios'),
  <View style={{ paddingTop: 20 }} />,
  null,
);
