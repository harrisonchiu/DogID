import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StatusBar,
} from 'react-native';

import { Camera } from 'expo-camera';
import LottieView from "lottie-react-native";

import { Logger } from '@actions/Log';
import { Colours } from '@config/Colours';
import { Normalizer } from '@actions/Normalize';
import { loadTensorflow, loadModel } from '@actions/LoadAssets';

const loadingAnimation = require('@assets/searching-animation.json')


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
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: Colours.green[400],
                }}
            >
                <StatusBar hidden />
                <View
                    style={{
                        width: '95%',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <LottieView
                        style={{
                            width: '35%',
                        }}
                        source={loadingAnimation}
                        autoPlay
                        loop
                    />
                    <Text
                        style={{
                            fontSize: Normalizer.fontPixel(230),
                            fontWeight: 'bold',
                        }}
                    >
                        DogID
                    </Text>
                </View>

                {this.state.isCameraPermitted === true ? (
                    <View />
                ) : (
                    <Text
                        style={{
                            fontSize: 32,
                            textAlign: 'center'
                        }}
                    >
                        Camera NOT PERMITTED
                    </Text>
                )}
            </View>
        );
    }
}

export default LoadingScreen;