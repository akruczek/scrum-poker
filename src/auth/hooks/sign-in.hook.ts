import * as React from 'react';
import { authSignIn } from '../helpers/auth-sign-in/auth-sign-in.helper';
import { handleAuthInputChange } from '../helpers/handle-auth-input-change/handle-auth-input-change.helper';

type ReturnType = [ string, string, (email: string) => void, (email: string) => void ];

export const useSignIn = (
  signIn: (email: string) => void,
): ReturnType => {
  const [ email, setEmail ] = React.useState('');
  const [ error, throwError ] = React.useState('');

  const handleSignIn = (email: string) => {
    authSignIn(email)(signIn, throwError);
  };

  const handleChange = (email: string) => {
    handleAuthInputChange(email)(setEmail, throwError);
  };

  return [ email, error, handleSignIn, handleChange ];
};
