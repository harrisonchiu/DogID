import React from 'react';
import {
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
  Image,
  View,
  Easing
} from 'react-native';

import LottieView from 'lottie-react-native'

class LoadingAnimation extends React.Component {
    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            <LottieView
            source={require('./lottie/home.json')}
            loop={false}
            autoPlay={false}
            progress={0} 
            style={{ width: 150, height: 150 }}
          />
        )
    }
}