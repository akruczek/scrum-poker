import * as React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { Button, Input } from 'react-native-elements';
import { Dispatch, bindActionCreators } from 'redux';
import { AppContainer, KeyboardAvoidingContainer, Container, Text } from '@core/styled';
import { Preloader } from '@core/components';
import { isPlatform } from '@core/helpers';
import { AUTH_TYPES } from '@core/models';
import { defaultFont, TEXT_SIZES } from '@core/constants';
import { signIn } from './store/auth.actions';
import { authContent } from './helpers/auth-content/auth-content.helper';
import { useSignIn } from './hooks/sign-in.hook';

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
  const [ email, error, handleSignIn, handleChange ] = useSignIn(signIn);
  const offset = isPlatform('android') ? 90 : 70;

  return (
    <AppContainer>
      <KeyboardAvoidingContainer behavior="padding" keyboardVerticalOffset={offset}>
        <Container alignItems="center" justifyContent="center">
          <Text margins="0 0 20px" size={TEXT_SIZES.REGULAR} children={authContent('title')[type]} />
          <Input
              value={email}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="Email"
              onChangeText={handleChange}
              errorMessage={error}
              errorStyle={{ position: 'absolute', top: 40 }}
              inputStyle={{ textAlign: 'center', fontFamily: defaultFont }}
          />
        </Container>

        <Button title={authContent('buttonText')[type]} onPress={() => handleSignIn(email)} />
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
