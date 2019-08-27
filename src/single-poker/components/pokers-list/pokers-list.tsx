import * as React from 'react';
import { AppContainer, ScrollContainer } from '@core/styled';
import { PokerModel } from '@core/models';
import { pokers } from '@core/constants';
import { ListItem } from '../list-item/list-item';

interface Props {
  handleNavigate: (poker: PokerModel) => void;
}

export const PokersList = ({ handleNavigate }: Props) => (
  <AppContainer>
    <ScrollContainer>
      {pokers.map((poker: PokerModel) => (
        <ListItem key={poker.name} poker={poker} handlePress={handleNavigate} />
      ))}
    </ScrollContainer>
  </AppContainer>
);
