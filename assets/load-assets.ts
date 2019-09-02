import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

export const loadAssets = async (): Promise<any> => {
  return Promise.all([
    Asset.loadAsync([
      require('./images/logo.png'),
    ]),
    Font.loadAsync({
      'space-mono': require('./fonts/SpaceMono-Regular.ttf'),
      'livvic': require('./fonts/Livvic-Medium.ttf'),
    }),
  ]);
};
