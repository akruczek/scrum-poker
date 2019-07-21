import * as React from 'react';
import { View } from 'react-native';
import { colors, Icon } from 'react-native-elements';

interface Props {
  height: number;
}

export const SwipeDeleteBar = (props: Props) => (
  <View
      style={{
        backgroundColor: colors.secondary,
        width: 380,
        paddingRight: 20,
        height: props.height,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
  >
    <Icon name="delete-forever" size={60} color="white" />
  </View>
);
