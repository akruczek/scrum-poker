import * as React from 'react';
import * as R from 'ramda';
import { View } from 'react-native';
import { Button, colors } from 'react-native-elements';
import { Separator } from '../../styled';
import { COLORS } from '../../constants';
import { TRANSLATIONS } from '../../models';
import { translate } from '@core/services/translations/translate';

interface Props {
  titles: [ TRANSLATIONS, TRANSLATIONS ];
  onPress: [ () => void, () => void ];
  disabled?: [ boolean, boolean ];
}

export const ButtonsSet = ({ titles, disabled, onPress }: Props) => (
  <View style={{ backgroundColor: COLORS.WHITE, paddingTop: 5 }}>
    <Button
        title={translate(titles[0])}
        onPress={onPress[0]}
        disabled={R.propOr(false, '0', disabled)}
    />

    <Separator margin={10} />

    <Button
        title={translate(titles[1])}
        onPress={onPress[1]}
        buttonStyle={{ backgroundColor: colors.secondary }}
        disabled={R.propOr(false, '1', disabled)}
    />
  </View>
);
