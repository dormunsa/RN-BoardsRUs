import React from 'react';
import { AppRegistry} from 'react-native';
import AppNavigator from './components/Navigator'
import { Provider } from 'react-redux'
import appStore from './components/AppStore'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={appStore}>
        <AppNavigator />
      </Provider>
    );
  }
}
AppRegistry.registerComponent("BoardsRUs", () => App);
