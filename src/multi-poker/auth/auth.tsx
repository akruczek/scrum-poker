import * as React from 'react';
import { AppContainer } from '../../core/styled/app-container/app-container';
import { ScrollContainer } from '../../core/styled/scroll-container/scroll-container.styled';
import { Container } from '../../core/styled/container/container.styled';
import { Input, Divider } from 'react-native-elements';
import { Text } from '../../core/styled/text/text.styled';

export class Auth extends React.Component<{}, {}> {
  render() {
    return (
      <AppContainer>
        <Container alignItems="center" justifyContent="center" margins="0 0 50px">
          <Text>SIGN IN</Text>

          {/* TODO: create custom input */}
          <Input
              placeholder="Email"
          />

          <Input
              placeholder="Password"
          />

        </Container>
      </AppContainer>
    );
  }
}
