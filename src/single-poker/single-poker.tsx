import React from 'react';
import { ScrollContainer, AppContainer, Container, ViewContainer } from '@core/styled';
import { NavigationProps } from '@core/navigation/navigation.model';
import { SCREENS } from '@core/navigation/screens';
import { HeaderBackButton, CardButton } from '@core/components';
import { PokerCard } from '@core/models';
import { FullScreenCard } from './components/full-screen-card/full-screen-card';
import { useSelectCard } from './hooks/select-cards/select-cards.hook';

const _SinglePoker = ({ navigation }: NavigationProps) => {
  const [ cards, selectedCard, handleSelect ] = useSelectCard(navigation);

  return (
    <AppContainer>
      <ScrollContainer showsVerticalScrollIndicator={false}>
        <Container margins="25px 0 0" flexDirection="row" justifyContent="space-around" flexWrap="wrap">
          {cards.map((card: PokerCard) => (
            <ViewContainer key={card.label} margins="0 0 10px">
              <CardButton card={card} handleSelect={handleSelect} />
            </ViewContainer>
          ))}
        </Container>
      </ScrollContainer>

      {selectedCard && (
        <FullScreenCard card={selectedCard} handleBackPress={() => handleSelect(null)} />
      )}
    </AppContainer>
  );
};

_SinglePoker.navigationOptions = ({ navigation }: NavigationProps) => ({
  title: navigation.getParam('title'),
  headerLeft: <HeaderBackButton navigation={navigation} screen={SCREENS.SINGLE_PLAYER} />,
});

export const SinglePoker = _SinglePoker;
