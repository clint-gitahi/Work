import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, AsyncStorage, ActivityIndicator } from 'react-native';
import Slides from '../components/Slides'

const SLIDE_DATA = [
  { text: 'Welcome to jobapp', color: '#03A9F4' },
  { text: 'Set your location, then swipe away', color: '#009688' },
  { text: 'Great lets get started', color: '#03A9F4'}
]

class WelcomeScreen extends Component {
  state = { token: null }

  async componentWillMount() {
    let token = await AsyncStorage.getItem('fb_token');

    if (token) {
      this.props.navigation.navigate('map');
      this.setState({ token });
    } else {
      this.setState({ token: false });
    }
  }

  onSlidesComplete = () => {
    this.props.navigation.navigate('auth')
  }

  render() {
    if (_.isNull(this.state.token)) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <Slides
        data={SLIDE_DATA}
        onComplete={this.onSlidesComplete}
      />
    )
  }
}

export default WelcomeScreen;
