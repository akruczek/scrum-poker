import * as React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { AppContainer } from '../../core/styled/app-container/app-container';
import { Container } from '../../core/styled/container/container.styled';
import { Button, Input } from 'react-native-elements';
import { Text } from '../../core/styled/text/text.styled';
import { Firebase } from '../../core/services/firebase/firebase.service';
import { UserModel } from '../../core/models/auth.models';
import { Dispatch, bindActionCreators } from 'redux';
import { setUser } from './store/auth.actions';
import { Preloader } from '../../core/components/preloader/preloader';

interface State {
  isPending: boolean;
  email: string;
}

interface StateProps {
  user: UserModel;
}

interface DispatchProps {
  setUser: (user: UserModel) => void;
}

export class _Auth extends React.Component<DispatchProps & StateProps, State> {
  constructor(props: State & StateProps & DispatchProps) {
    super(props);
    this.state = {
      isPending: false,
      email: '',
    };
  }

  handleSubmitSuccess(data: UserModel) {
    this.setState({ isPending: false });
    this.props.setUser(data);
  }

  async handleSubmit() {
    this.setState({ isPending: true });
    Firebase.signIn(this.state.email, 'password', this.handleSubmitSuccess.bind(this));
  }

  handleChange(field: string, value: string) {
    this.setState({ [field]: value } as any);
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

        {this.state.isPending && <Preloader />}
      </AppContainer>
    );
  }
}

const mapStateToProps = R.applySpec<StateProps>({
  user: R.path([ 'auth', 'model' ]),
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(
  { setUser },
  dispatch,
);

export const Auth = connect<StateProps, any, {}>(
  mapStateToProps, mapDispatchToProps,
)(_Auth as any);
