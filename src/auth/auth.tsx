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
import { KeyboardAvoidingContainer } from '../core/styled/keyboard-avoiding-container/keyboard-avoiding-container';
import { validateEmail } from './helpers/validate-email.helper';
import { translate } from '../core/services/translations/translations.service';
import { TRANSLATIONS } from '../core/models/translations.models';

interface Props {
  type: AUTH_TYPES;
}

interface StateProps {
  isPending: boolean;
}

interface DispatchProps {
  signIn: (email: string) => void;
}

export const _Auth = (props: DispatchProps & StateProps & Props) => {
  const [ email, setEmail ] = React.useState('');
  const [ error, throwError ] = React.useState('');

  const content = {
    buttonText: {
      [AUTH_TYPES.JOIN]: translate(TRANSLATIONS.JOIN),
      [AUTH_TYPES.LOGIN]: translate(TRANSLATIONS.LOGIN),
    },
    title: {
      [AUTH_TYPES.JOIN]: translate(TRANSLATIONS.JOIN_SESSION),
      [AUTH_TYPES.LOGIN]: translate(TRANSLATIONS.SIGN_IN),
    },
  };

  const handleSignIn = (email: string) => {
    if (validateEmail(email)) {
      props.signIn(email);
    } else {
      throwError(translate(TRANSLATIONS.WRONG_EMAIL));
    };
  };

  const handleChange = (email: string) => {
    throwError('');
    setEmail(email);
  };

  const { type, isPending } = props;
  const { buttonText, title } = content;

  return (
    <AppContainer>
      <KeyboardAvoidingContainer keyboardVerticalOffset={100}>
        <Container alignItems="center" justifyContent="center" margins="0 0 100px">
          <Text margins="0 0 20px" children={title[type]} />
          <Input
              value={email}
              placeholder="Email"
              onChangeText={handleChange}
              errorMessage={error}
              errorStyle={{ position: 'absolute', top: 40 }}
          />
        </Container>

        <Button title={buttonText[type]} onPress={() => handleSignIn(email)} />

        {isPending && <Preloader />}
      </KeyboardAvoidingContainer>
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
