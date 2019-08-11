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

interface State {
  isLoadingComplete: boolean;
}

interface DispatchProps {
  getTranslations: (code: LANGUAGE_CODES) => void;
}

export default class App extends React.Component<Props & DispatchProps, State> {
  constructor(props: Props & DispatchProps) {
    super(props);
    this.state = {
      isLoadingComplete: false,
    };

    this.loadingComplete = this.loadingComplete.bind(this);
  }

  componentDidMount() {
    Firebase.initialize();
    appStore.dispatch({ type: TRANSLATIONS_ACTIONS.INITIALIZE });
    appStore.dispatch({ type: AUTH_ACTIONS.INITIALIZE });
    appStore.dispatch({ type: JIRA_ACTIONS.INITIALIZE });
  }

  isLoading() {
    return (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) || isBlank(appStore.getState().translations.models);
  }

  loadingError(error: any) {
    console.error(error);
  };

  loadingComplete() {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    return ifElse(
      this.isLoading(),
      <AppLoading
          startAsync={loadAssets}
          onError={this.loadingError}
          onFinish={this.loadingComplete.bind(this)}
      />,
      <Provider store={appStore}>
        <Container>
          {isPlatform('ios') && <StatusBar barStyle="default" />}
          <AppNavigator />
        </Container>
      </Provider>,
    );
  }
}
