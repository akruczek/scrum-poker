import { YellowBox } from 'react-native';

export const hideWarnings = () => {
  YellowBox.ignoreWarnings([ 'Setting a timer' ]);

  const _console = { ...console };

  console.warn = (message: string) => {
    if (message.indexOf('Setting a timer') <= -1) {
      _console.warn(message);
    }
  };
};
