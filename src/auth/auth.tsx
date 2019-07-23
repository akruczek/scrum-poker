import * as React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { Button, Input } from 'react-native-elements';
import { Dispatch, bindActionCreators } from 'redux';
import { AppContainer } from '../core/styled/app-container/app-container';
import { Container } from '../core/styled/container/container.styled';
import { Text } from '../core/styled/text/text.styled';
import { signIn } from './store/auth.actions';
import { Preloader } from '../core/components/preloader/preloader';
import { AUTH_TYPES } from './models/auth.models';

interface Props {
  type: AUTH_TYPES;
}

interface State {
  email: string;
}

interface StateProps {
  isPending: boolean;
}

interface DispatchProps {
  signIn: (email: string) => void;
}

export class _Auth extends React.Component<DispatchProps & StateProps & Props, State> {
  constructor(props: StateProps & DispatchProps & Props) {
    super(props);
    this.state = {
      email: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  private content = {
    buttonText: {
      [AUTH_TYPES.JOIN]: 'JOIN',
      [AUTH_TYPES.LOGIN]: 'LOGIN',
    },
    title: {
      [AUTH_TYPES.JOIN]: 'JOIN SESSION',
      [AUTH_TYPES.LOGIN]: 'SIGN IN',
    },
  };

  private handleSubmit() {
    this.props.signIn(this.state.email);
  }

  private handleChange(field: string) {
    return (value: string) => {
      this.setState({ [field]: value } as {});
    };
  }

  render() {
    const { email } = this.state;
    const { title, buttonText } = this.content;
    const { isPending, type } = this.props;

    return (
      <AppContainer>
        <Container alignItems="center" justifyContent="center" margins="0 0 100px">
          <Text margins="0 0 20px" children={title[type]} />
          <Input value={email} placeholder="Email" onChangeText={this.handleChange('email')} />
        </Container>

        <Button title={buttonText[type]} onPress={this.handleSubmit} />

        {isPending && <Preloader />}
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

export const Auth = connect<StateProps, DispatchProps, Props>(
  mapStateToProps, mapDispatchToProps,
)(_Auth);
