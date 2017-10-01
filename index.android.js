/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './store'

import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingScreen from './screens/SettingScreen';
import ReviewScreen from './screens/ReviewScreen';


const ViewJobs = TabNavigator({
  Welcome: { screen: WelcomeScreen },
  auth: { screen: AuthScreen},
  main: {
    screen: TabNavigator({
        map: { screen: MapScreen },
        deck: { screen: DeckScreen },
    })
  }
}, {
  navigationOptions: {
    tabBarVisible: false
  },
  lazy: true
});
class Jobs extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1}}>
          <ViewJobs />
        </View>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Jobs', () => Jobs);
