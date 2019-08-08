import { YellowBox } from 'react-native';

export const _console = { ...console };

export const hideWarnings = () => {
  YellowBox.ignoreWarnings([ 'Setting a timer' ]);

  console.warn = (message: string) => {
    if (message.indexOf('Setting a timer') <= -1) {
      _console.warn(message);
    }
  };
};
