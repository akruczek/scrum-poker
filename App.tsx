import * as React from 'react';
import { StatusBar } from 'react-native';
import { AppLoading } from 'expo';
import { loadAssets } from './assets/load-assets';
import { AppNavigator } from './App.navigation';
import { Provider } from 'react-redux';
import { appStore } from './src/store/configure-store';
import { Container } from './src/core/styled/container/container.styled';
import { ifElse, isPlatform } from './src/core/helpers';
import { Firebase } from './src/core/services/firebase/firebase.service';
import { LANGUAGE_CODES } from './src/core/models/translations.models';
import { Translations } from './src/core/services/translations/translations.service';
import { AuthService } from './src/core/services/auth/auth.service';

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
    Translations.initialize();
    AuthService.initialize();
  }

  isLoading() {
    return !this.state.isLoadingComplete && !this.props.skipLoadingScreen;
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
