import * as React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { Button, Input } from 'react-native-elements';
import { Dispatch, bindActionCreators } from 'redux';
import { AppContainer, KeyboardAvoidingContainer, Container, Text } from '@core/styled';
import { Preloader } from '@core/components';
import { isPlatform } from '@core/helpers';
import { signIn } from './store/auth.actions';
import { AUTH_TYPES } from './models/auth.models';
import { authContent } from './helpers/auth-content/auth-content.helper';
import { authSignIn } from './helpers/auth-sign-in/auth-sign-in.helper';
import { handleAuthInputChange } from './helpers/handle-auth-input-change/handle-auth-input-change.helper';

interface Props {
  type: AUTH_TYPES;
}

interface StateProps {
  isPending: boolean;
}

interface DispatchProps {
  signIn: (email: string) => void;
}

export const _Auth = ({ type, isPending, signIn }: DispatchProps & StateProps & Props) => {
  const [ email, setEmail ] = React.useState('');
  const [ error, throwError ] = React.useState('');

  const handleSignIn = (email: string) => {
    authSignIn(email)(signIn, throwError);
  };

  const handleChange = (email: string) => {
    handleAuthInputChange(email)(setEmail, throwError);
  };

  const buttonTitle = authContent('buttonText')[type];
  const offset = isPlatform('android') ? 90 : 70;

  return (
    <AppContainer>
      <KeyboardAvoidingContainer behavior="padding" keyboardVerticalOffset={offset}>
        <Container alignItems="center" justifyContent="center">
          <Text margins="0 0 20px" children={authContent('title')[type]} />
          <Input
              value={email}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="Email"
              onChangeText={handleChange}
              errorMessage={error}
              errorStyle={{ position: 'absolute', top: 40 }}
              inputStyle={{ textAlign: 'center' }}
          />
        </Container>

        <Button title={String(buttonTitle)} onPress={() => handleSignIn(email)} />
      </KeyboardAvoidingContainer>

      {isPending && <Preloader />}
    </AppContainer>
  );
};

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
