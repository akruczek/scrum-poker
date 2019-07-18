import * as React from 'react';
import logo from '../../../assets/images/briisk-logo.png';
import { Text } from '../../core/styled/text/text.styled';
import { AppContainer } from '../../core/styled/app-container/app-container';
import { ScrollContainer } from '../../core/styled/scroll-container/scroll-container.styled';
import { Container } from '../../core/styled/container/container.styled';
import { Image } from '../../core/styled/image/image.styled';
import { TEXT_SIZES } from '../../core/styled/text/text.model';

export class Dashboard extends React.Component<{}, {}> {
  render() {
    return (
      <AppContainer>
        <ScrollContainer>
          <Container alignItems="center" margins="40px 0 0">
            <Image source={logo} size={120} />
            <Text size={TEXT_SIZES.BIG}>
              Multi player mode
            </Text>
          </Container>
        </ScrollContainer>
      </AppContainer>
    );
  }
}
