import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    Animated,
    StatusBar,
} from 'react-native';

import { Camera } from 'expo-camera';

import { Logger } from '@actions/Log';
import { Colours } from '@config/Colours';
import { Normalizer, screenHeight, screenWidth } from '@actions/Normalize';


interface Props {
    navigation: any,
}


interface States {
    topCameraBarHeight: number,
    bottomCameraBarHeight: number,
    cameraHeight: number,
    cameraWidth: number,
    cameraRatio: string,
    isCameraRatioReady: boolean,
    capturedPhotoUri: string,
    isScreenFocused: boolean,
}


class CameraScreen extends Component<Props, States> {
    constructor(props: any) {
        super(props);
        this.state = {
            topCameraBarHeight: 0,
            bottomCameraBarHeight: 0,
            cameraHeight: 0,
            cameraWidth: 0,

            capturedPhotoUri: '',

            cameraRatio: '4:3',
            isCameraRatioReady: false,
            isScreenFocused: true,
        };

        Logger.trace('Navigated to Camera screen');
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
            Logger.trace('Camera screen is now on focus');
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
        const cameraPreviewHeight = ratio * screenWidth;

        // For small phones, the top camera bar height is small and useless
        // Remove it and give the space to the bottom bar
        let topCameraBarHeight = (screenHeight - cameraPreviewHeight) / 4;
        let bottomCameraBarHeight = 3 * (screenHeight - cameraPreviewHeight) / 4;

        if (topCameraBarHeight < screenHeight / 12) {
            bottomCameraBarHeight += topCameraBarHeight;
            topCameraBarHeight = 0;
        }

        // Padding on top and bottom
        this.setState({
            topCameraBarHeight: topCameraBarHeight,
            bottomCameraBarHeight: bottomCameraBarHeight,

            cameraHeight: cameraPreviewHeight,
            cameraWidth: screenWidth,
            isCameraRatioReady: true,

            isScreenFocused: true,
        }, () => {
            Logger.trace('Finished setting camera ratio to ' + this.state.cameraRatio);
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

            Logger.info('Camera took a picture');

            this.transitionToPredictionScreen(image.uri);
        } else {
            Logger.error('Camera is not set but tried to take a picture');
        }
    }

    private transitionToPredictionScreen = (imageUri: string): void => {
        Logger.trace('Trying to navigate from Camera screen to Prediction screen');

        this.setState({
            capturedPhotoUri: imageUri
        }, () => {
            this.setState({
                isScreenFocused: false
            }, () => {
                this.props.navigation.push(
                    'PredictionScreen', {
                        imageUri: imageUri,
                        cameraHeight: this.state.cameraHeight,
                        cameraWidth: this.state.cameraWidth,
                        topCameraBarHeight: this.state.topCameraBarHeight,
                        bottomCameraBarHeight: this.state.bottomCameraBarHeight,
                    }
                );
            })
        });
    }

    render() {
        if (this.state.isScreenFocused === true) {
            Logger.debug('Camera has been mounted');
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'space-between',
                        backgroundColor: Colours.gray[900],
                    }}
                >
                    <StatusBar hidden />

                    {/* Top camera bar */}
                    <View
                        style={{
                            alignItems: 'center',
                            height: this.state.topCameraBarHeight,
                            backgroundColor: Colours.gray[900],
                        }}
                    />

                    {/* Camera */}
                    <Camera
                        style={{ height: this.state.cameraHeight, width: this.state.cameraWidth }}
                        ratio={this.state.cameraRatio}
                        ref={(ref) => { this.camera = ref }}
                    />

                    {/* Bottom camera bar */}
                    <View
                        style={{
                            alignItems: 'center',
                            height: this.state.bottomCameraBarHeight,
                            backgroundColor: Colours.gray[900],
                        }}
                    >
                        {/* Top buttons area */}
                        <View style={{ flex: 0.3 }} />

                        {/* Bottom buttons area */}
                        <View
                            style={{
                                flex: 0.7,
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                                width: '100%',
                            }}
                        >
                            {/* Camera capture button container */}
                            <Animated.View 
                                style={{
                                    alignItems: 'center',
                                    minHeight: Normalizer.heightPixel(220),
                                    minWidth: Normalizer.heightPixel(220),
                                    height: Normalizer.heightPixel(220),
                                    width: Normalizer.heightPixel(220),
                                    transform: [{ scale: this.captureButtonScale }]
                                }}
                            >
                                {/* Camera capture button */}
                                <TouchableOpacity
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                        borderRadius: 50,
                                        backgroundColor: Colours.red[500],
                                    }}
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
            Logger.debug('Camera has been unmounted');
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'space-between',
                        backgroundColor: Colours.gray[900],
                    }}
                >
                    <StatusBar hidden />

                    {/* Top camera bar */}
                    <View
                        style={{
                            alignItems: 'center',
                            height: this.state.topCameraBarHeight,
                            backgroundColor: Colours.gray[900],
                        }}
                    />

                    {/* Captured image */}
                    <Image
                        style={{
                            height: this.state.cameraHeight,
                            width: this.state.cameraWidth,
                        }}
                        source={{
                            uri: this.state.capturedPhotoUri
                        }}
                    />

                    {/* Bottom camera bar */}
                    <View
                        style={{
                            alignItems: 'center',
                            height: this.state.bottomCameraBarHeight,
                            backgroundColor: Colours.gray[900],
                        }}
                    />
                </View>
            );
        }
    }
}

export default CameraScreen;