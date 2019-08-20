export const handleAuthInputChange = (
  email: string,
) => (
  setEmail: (email: string) => void,
  throwError: (message: string) => void,
) => {
  throwError('');
  setEmail(email);
};
