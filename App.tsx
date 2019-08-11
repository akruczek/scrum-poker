import * as React from 'react';
import { StatusBar } from 'react-native';
import { AppLoading } from 'expo';
import { Provider } from 'react-redux';
import { Container } from '@core/styled';
import { ifElse, isPlatform, isBlank } from '@core/helpers';
import { Firebase } from '@core/services/firebase/firebase.service';
import { LANGUAGE_CODES } from '@core/models';
import { loadAssets } from '@assets/load-assets';
import { AppNavigator } from './App.navigation';
import { appStore } from './src/store/configure-store';
import { JIRA_ACTIONS } from './src/core/services/jira/store/jira.actions';
import { AUTH_ACTIONS } from './src/auth/store/auth.actions';
import { TRANSLATIONS_ACTIONS } from './src/core/services/translations/store/translations.actions';

interface Props {
  skipLoadingScreen?: boolean;
}

const App = ({ skipLoadingScreen }: Props) => {
  const [ isLoadingComplete, setLoadingComplete ] = React.useState(false);

  const initializeApp = async (): Promise<any> =>
    Promise.all([
      loadAssets(),
      Firebase.initialize(),
      appStore.dispatch({ type: TRANSLATIONS_ACTIONS.INITIALIZE }),
      appStore.dispatch({ type: AUTH_ACTIONS.INITIALIZE }),
      appStore.dispatch({ type: JIRA_ACTIONS.INITIALIZE }),
    ]);

  const isLoading = () =>
    (!isLoadingComplete && !skipLoadingScreen) || isBlank(appStore.getState().translations.models);

  return ifElse(
    isLoading(),
    <AppLoading
        startAsync={initializeApp}
        onError={error => console.error(error)}
        onFinish={() => setLoadingComplete(true)}
    />,
    <Provider store={appStore}>
      <Container>
        {isPlatform('ios') && <StatusBar barStyle="default" />}
        <AppNavigator />
      </Container>
    </Provider>,
  );
};

export default App;
