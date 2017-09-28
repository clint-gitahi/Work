import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Slides from '../components/Slides'

const SLIDE_DATA = [
  { text: 'Welcome to jobapp', color: '#03A9F4' },
  { text: 'Set your location, then swipe away', color: '#009688' },
  { text: 'Great lets get started', color: '#03A9F4'}
]

class WelcomeScreen extends Component {
  onSlidesComplete = () => {
    this.props.navigation.navigate('Auth')
  }
  
  render() {
    return (
      <Slides
        data={SLIDE_DATA}
        onComplete={this.onSlidesComplete}
      />
    )
  }
}

export default WelcomeScreen;
