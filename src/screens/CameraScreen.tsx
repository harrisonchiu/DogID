import React, { Component } from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Image,
    Animated,
    StatusBar,
} from 'react-native';

import { Camera } from 'expo-camera';

import { Time } from '@actions/Log';
import { styles } from '@config/Styles';


interface Props {
    navigation: any,
}


interface States {
    screenHeight: number,
    screenWidth: number,
    topCameraBarHeight: number,
    bottomCameraBarHeight: number,
    cameraHeight: number,
    cameraWidth: number,
    cameraRatio: string,
    isCameraRatioReady: boolean,
    isScreenFocused: boolean,
}


class CameraScreen extends Component<Props, States> {
    constructor(props: any) {
        super(props);
        this.state = {
            screenHeight: Dimensions.get('window').height,
            screenWidth: Dimensions.get('window').width,

            topCameraBarHeight: 0,
            bottomCameraBarHeight: 0,
            cameraHeight: 0,
            cameraWidth: 0,

            cameraRatio: '4:3',
            isCameraRatioReady: false,
            isScreenFocused: true,
        };

        console.log(Time() + '[INFO] Navigated to Camera screen')
    }

    private camera: Camera | null = null;
    private captureButtonAnimation: Animated.Value = new Animated.Value(0);
    private captureButtonScale = this.captureButtonAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.8],
    });

    async componentDidMount() {
        // Adds a listener to check if camera screen is focused
        // Used to unmount camera
        this.props.navigation.addListener('focus', () => {
            console.log(Time() + '[INFO] Camera screen is now on focus')
            this.setState({ isScreenFocused: true })
        });

        // Does the camera ratio calculations only when needed
        if (this.state.isCameraRatioReady === false) {
            await this.prepareCameraRatio();
        }
    }

    // Set the camera preview's ratio
    private prepareCameraRatio = async(): Promise<void> => {
        // Ratio is treated as screenHeight:screenWidth
        const ratio = parseInt(this.state.cameraRatio.split(':')[0])
                        / parseInt(this.state.cameraRatio.split(':')[1]);
        const cameraPreviewHeight = ratio * this.state.screenWidth;

        // Padding on top and bottom
        this.setState({
            topCameraBarHeight: (this.state.screenHeight - cameraPreviewHeight) / 4,
            bottomCameraBarHeight: 3 * (this.state.screenHeight - cameraPreviewHeight) / 4,

            cameraHeight: cameraPreviewHeight,
            cameraWidth: this.state.screenWidth,
            isCameraRatioReady: true,

            isScreenFocused: true,
        }, () => {
            console.log(Time() + '[INFO] Finished setting camera ratio to ' + this.state.cameraRatio)
        });
    }

    // Animate capture button scaling down slightly on press in
    private animateCaptureButtonPressIn = (): void => {
        Animated.spring(this.captureButtonAnimation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    }

    // Animate capture button scaling back to normal on press out
    private animateCaptureButtonPressOut = (): void => {
        Animated.spring(this.captureButtonAnimation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    }

    // Takes an image and immediately switches to analyze the image
    private takePicture = async(): Promise<void> => {
        if (this.camera) {
            const image = await this.camera.takePictureAsync({
                base64: true,
                skipProcessing: true
            });

            console.log(Time() + '[INFO] Camera took a picture')

            this.transitionToPredictionScreen(image.uri)
        } else {
            console.log(Time() + '[WARN] Camera is not set but tried to take a picture')
        }
    }

    private transitionToPredictionScreen = (imageUri: string): void => {
        console.log(Time() + '[INFO] Trying to navigate from Camera screen to Prediction screen')

        this.setState({ isScreenFocused: false })
        this.props.navigation.push(
            'PredictionScreen', {
                imageUri: imageUri,
                cameraHeight: this.state.cameraHeight,
                cameraWidth: this.state.cameraWidth,
                topCameraBarHeight: this.state.topCameraBarHeight,
                bottomCameraBarHeight: this.state.bottomCameraBarHeight,
            }
        );
    }

    render() {
        if (this.state.isScreenFocused === true) {
            console.log(Time() + '[INFO] Camera has been mounted')
            return (
                <View style={styles.screenContainer}>
                    <StatusBar hidden />
                    <View style={[styles.cameraTopBar, { height: this.state.topCameraBarHeight }]} />
                    <Camera
                        style={{ height: this.state.cameraHeight, width: this.state.cameraWidth }}
                        ratio={this.state.cameraRatio}
                        ref={(ref) => { this.camera = ref }}
                    />
                    <View style={[styles.cameraBottomBar, { height: this.state.bottomCameraBarHeight }]}>
                        <View style={{ flex: 0.8 }} />
                        <View style={{ flex: 1, alignItems: 'center', height: '100%', width: '100%' }}>
                            <Animated.View 
                                style={[
                                    styles.captureButtonContainer, {
                                        height: this.state.bottomCameraBarHeight / 2.5,
                                        width: this.state.bottomCameraBarHeight / 2.5,
                                        transform: [{ scale: this.captureButtonScale }]
                                    }
                                ]}
                            >
                                <TouchableOpacity
                                    style={styles.captureButton}
                                    onPress={this.takePicture}
                                    onPressIn={this.animateCaptureButtonPressIn}
                                    onPressOut={this.animateCaptureButtonPressOut}
                                    activeOpacity={1}
                                />
                            </Animated.View>
                        </View>
                    </View>
                </View>
            );
        } else {
            console.log(Time() + '[INFO] Camera has been unmounted')
            return (
                <View style={styles.screenContainer}>
                    <StatusBar hidden />
                    <View style={[styles.cameraTopBar, { height: this.state.topCameraBarHeight }]} />
                    <View style={[styles.cameraBottomBar, { height: this.state.bottomCameraBarHeight }]} />
                </View>
            );
        }
    }
}

export default CameraScreen;