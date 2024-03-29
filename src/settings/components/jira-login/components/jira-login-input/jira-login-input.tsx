import * as React from 'react';
import { View } from 'react-native';
import { Input } from 'react-native-elements';
import { defaultFont } from '@core/constants';

interface Props {
  placeholder: string;
  onChange: (value: string) => void;
  value: string;
  isSecure?: boolean;

}

export const JiraLoginInput = ({ placeholder, onChange, value, isSecure }: Props) => (
  <View style={{ flexGrow: 9 }}>
    <Input
        placeholder={placeholder}
        onChangeText={onChange}
        value={value}
        secureTextEntry={isSecure}
        autoCapitalize="none"
        autoCorrect={false}
        // style={{ fontFamily: defaultFont, fontWeight: undefined }}
        inputStyle={{ fontFamily: defaultFont }}
    />
  </View>
);
