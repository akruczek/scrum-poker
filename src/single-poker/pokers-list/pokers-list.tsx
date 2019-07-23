import * as React from 'react';
import { AppContainer } from '../../core/styled/app-container/app-container';
import { ScrollContainer } from '../../core/styled/scroll-container/scroll-container.styled';
import { PokerModel } from '../../core/models/poker.models';
import { pokers } from '../../core/constants/pokers';
import { ListItem } from '../list-item/list-item';

interface Props {
  handleNavigate: (poker: PokerModel) => void;
}

export const PokersList = (props: Props) => (
  <AppContainer>
    <ScrollContainer>
      {pokers.map((poker: PokerModel) => (
        <ListItem key={poker.name} poker={poker} handlePress={props.handleNavigate} />
      ))}
    </ScrollContainer>
  </AppContainer>
);
