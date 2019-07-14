import React from 'react';
import { Text } from '../../../core/styled/text/text.styled';
import { TEXT_SIZES } from '../../../core/styled/text/text.model';
import { Container } from '../../../core/styled/container/container.styled';
import { ScrollContainer } from '../../../core/styled/scroll-container/scroll-container.styled';
import { Image } from '../../../core/styled/image/image.styled';
import { AppContainer } from '../../../core/styled/app-container/app-container';
import { NavigationProps } from '../../../core/navigation/navigation.model';
import logo from '../../../../assets/images/briisk-logo.png';

export class SinglePlayer extends React.Component<NavigationProps, {}> {
  static navigationOptions = {
    title: 'Single Player',
  };

  render() {
    return (
      <AppContainer>
        <ScrollContainer>
          <Container alignItems="center" margins="40px 0 0">
            <Image source={logo} size={120} />
            <Text size={TEXT_SIZES.BIG}>
              Single player mode
            </Text>
          </Container>
        </ScrollContainer>
      </AppContainer>
    );
  }
}
