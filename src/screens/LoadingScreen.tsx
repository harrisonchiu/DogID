import React, { Component } from 'react';
import {
    View,
    Text,
    StatusBar
} from 'react-native';

import { Camera } from 'expo-camera';
import LottieView from "lottie-react-native";

import { Logger } from '@actions/Log';
import { styles } from '@config/Styles';
import { loadTensorflow, loadModel } from '@actions/LoadAssets';


const loadingAnimation = require('@assets/like.json')


interface Props {
    navigation: any,
}


interface States {
    isLoadingDone: boolean,
    isCameraPermitted: boolean,
}


class LoadingScreen extends Component<Props, States> {
    constructor(props: any) {
        super(props);
        this.state = {
            isLoadingDone: false,
            isCameraPermitted: false,
        };

        Logger.trace('Navigated to Loading screen');
    }

    async componentDidMount() {
        const { status } = await Camera.requestPermissionsAsync();
        Logger.info('Requesting camera permissions');

        if (status === 'granted') {
            this.setState({ isCameraPermitted: true });
            Logger.info('Camera permissions granted');

            await loadTensorflow();
            await loadModel();

            setTimeout(() => {
                this.transitionToCameraScreen();
            }, 0);
        }
    }

    private transitionToCameraScreen = (): void => {
        Logger.debug('Trying to navigate from Loading screen to Camera screen');
        Logger.debug('Removing loading screen from navigation stack');

        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'CameraScreen' }],
        });
    }

    render() {
        return (

            <View style={styles.screenContainerWithText}>
                <StatusBar hidden />
                {this.state.isCameraPermitted === true ? (
                    <LottieView source={loadingAnimation} autoPlay loop />
                ) : (
                    <Text style={styles.screenContainerText}>Camera NOT PERMITTED</Text>
                )}
            </View>
        );
    }
}

export default LoadingScreen;