import * as React from 'react';
import jiraIcon from '@assets/custom-icons/jira.png';
import { View } from 'react-native';
import { CustomIcon } from '@core/styled';
import { ICON_SIZES } from '@core/models';

export const JiraBadgeIcon = () => (
  <View style={{ marginRight: 20 }}>
    <CustomIcon size={ICON_SIZES.STANDARD} source={jiraIcon} />
  </View>
);
