import * as React from 'react';
import { Input } from 'react-native-elements';
import { Text, Separator } from '@core/styled';
import { translate } from '@core/services/translations/translate';
import { TRANSLATIONS } from '@core/models';
import { TEXT_SIZES } from '@core/constants';

interface Props {
  finalEstimation: string;
  setFinalEstimation: (value: string) => void;
}

export const EstimationField = ({ finalEstimation, setFinalEstimation }: Props) => (
  <>
    <Text margins="0 0 10px" children={translate(TRANSLATIONS.TYPE_FINAL_ESTIMATION)} />
    <Input
        value={finalEstimation}
        placeholder={translate(TRANSLATIONS.FINAL_ESTIMATION)}
        onChangeText={setFinalEstimation}
        inputStyle={{ textAlign: 'center', fontSize: TEXT_SIZES.BIG }}
    />
    <Separator margin={10} />
  </>
);
