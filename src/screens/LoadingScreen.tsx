import React, { Component } from 'react';
import {
    View,
    Text,
    StatusBar
} from 'react-native';

import { Camera } from 'expo-camera';
import LottieView from "lottie-react-native";

import { Logger } from '@actions/Log';
import { Colours } from '@config/Colours';
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

            this.transitionToCameraScreen();
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
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: Colours.green[400],
                }}
            >
                <StatusBar hidden />
                {this.state.isCameraPermitted === true ? (
                    <LottieView source={loadingAnimation} autoPlay loop />
                ) : (
                    <Text style={{ fontSize: 32, textAlign: 'center' }}>Camera NOT PERMITTED</Text>
                )}
            </View>
        );
    }
}

export default LoadingScreen;