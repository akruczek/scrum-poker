import * as React from 'react';
import { ifElse, isPresent } from '@core/helpers';
import { PokerCard, TRANSLATIONS } from '@core/models';
import { Text, ViewContainer } from '@core/styled';
import { translate } from '@core/services/translations/translate';
import { CardButton } from '@core/components';

interface Props {
  estimationsList: PokerCard[];
  setFinalEstimation: (estimation: string) => void;
}

export const EstimationsList = ({ estimationsList, setFinalEstimation }: Props) => ifElse(
  isPresent(estimationsList),
  <>
    <Text margins="0 0 10px" children={translate(TRANSLATIONS.OR_CHOOSE)} />
    <ViewContainer direction="row">
      {estimationsList.map(card => (
        <ViewContainer key={card.value} margins="0 5px">
          <CardButton card={card} handleSelect={() => setFinalEstimation(String(card.value))} />
        </ViewContainer>
      ))}
    </ViewContainer>
  </>,
  null,
);
