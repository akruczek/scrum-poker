import * as React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { AppContainer } from '../../core/styled/app-container/app-container';
import { Container } from '../../core/styled/container/container.styled';
import { Button, Input } from 'react-native-elements';
import { Text } from '../../core/styled/text/text.styled';
import { Dispatch, bindActionCreators } from 'redux';
import { signIn } from './store/auth.actions';
import { Preloader } from '../../core/components/preloader/preloader';

interface State {
  email: string;
}

interface StateProps {
  isPending: boolean;
}

interface DispatchProps {
  signIn: (email: string) => void;
}

export class _Auth extends React.Component<DispatchProps & StateProps, State> {
  constructor(props: StateProps & DispatchProps) {
    super(props);
    this.state = {
      email: '',
    };
  }

  async handleSubmit() {
    this.props.signIn(this.state.email);
  }

  handleChange(field: string, value: string) {
    this.setState({ [field]: value } as {});
  }

  render() {
    return (
      <AppContainer>
        <Container alignItems="center" justifyContent="center" margins="0 0 100px">
          <Text margins="0 0 20px">
            JOIN SESSION
          </Text>

          <Input
              value={this.state.email}
              placeholder="Email"
              onChangeText={(value: string) => this.handleChange('email', value)}
          />
        </Container>

        <Button title="JOIN" onPress={this.handleSubmit.bind(this)} />

        {this.props.isPending && <Preloader />}
      </AppContainer>
    );
  }
}

const mapStateToProps = R.applySpec<StateProps>({
  isPending: R.path([ 'auth', 'isPending' ]),
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(
  { signIn },
  dispatch,
);

export const Auth = connect<StateProps, DispatchProps, any>(
  mapStateToProps, mapDispatchToProps,
)(_Auth);
