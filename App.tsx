import * as React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { StatusBar } from 'react-native';
import { AppLoading } from 'expo';
import { loadAssets } from './assets/load-assets';
import { AppNavigator } from './App.navigation';
import { Provider } from 'react-redux';
import { appStore } from './src/store/configure-store';
import { Container } from './src/core/styled/container/container.styled';
import { ifElse, isPlatform } from './src/core/helpers';
import { Firebase } from './src/core/services/firebase/firebase.service';
import { Storage } from './src/core/services/device-storage/device-storage.service';
import { Dispatch, bindActionCreators } from 'redux';
import { signIn, AUTH_ACTIONS } from './src/multi-poker/auth/store/auth.actions';

interface Props {
  skipLoadingScreen?: boolean;
}

interface State {
  isLoadingComplete: boolean;
}

interface DispatchProps {
  signIn: (email: string) => void;
}

export default class _App extends React.Component<Props & DispatchProps, State> {
  constructor(props: Props & DispatchProps) {
    super(props);
    this.state = {
      isLoadingComplete: false,
    };

    this.loadingComplete = this.loadingComplete.bind(this);
  }
  
  componentDidMount() {
    Firebase.initialize();
    Storage
      .get('userEmail')
      .then(payload => payload ? appStore.dispatch({ type: AUTH_ACTIONS.SIGN_IN, payload }) : {});
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

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(
  { signIn },
  dispatch,
);

export const App = connect<any, DispatchProps, Props>(
  null, mapDispatchToProps,
)(_App);
