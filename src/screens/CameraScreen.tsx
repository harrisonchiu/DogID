import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    Animated,
    StatusBar,
} from 'react-native';

import { Camera } from 'expo-camera';
import { Menu, IconButton, Button, Avatar } from 'react-native-paper';
import Slider from '@react-native-community/slider';

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
    cameraViewType: any,
    cameraFlashMode: any,
    isCameraFlashMenuVisible: boolean,
    cameraZoom: number,
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

            // back is main camera, front is selfie camera
            cameraViewType: Camera.Constants.Type.back,

            // on: flash when taking picture, off: never flash
            // auto: flash if dark, torch: flash during preview
            cameraFlashMode: Camera.Constants.FlashMode.off,
            isCameraFlashMenuVisible: false,

            cameraZoom: 0,
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
            Logger.debug('Camera screen is now on focus and trying to mount camera component');
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

        if (topCameraBarHeight < screenHeight / 13) {
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

    // Switch the camera between front-facing and rear (main) camera
    private flipCameraView = (): void => {
        if (this.state.cameraViewType === Camera.Constants.Type.front) {
            this.setState({
                cameraViewType: Camera.Constants.Type.back,
            });
        } else if (this.state.cameraViewType === Camera.Constants.Type.back) {
            this.setState({
                cameraViewType: Camera.Constants.Type.front,
            })
        } else {
            Logger.warn('Camera view type is of unknown type, could not switch camera view');
        }
    }

    // Changes the menu visibility when the flash button is clicked to show the menu options
    private changeFlashModeMenuVisibility = (): void => {
        if (this.state.isCameraFlashMenuVisible === true) {
            this.setState({
                isCameraFlashMenuVisible: false,
            });
        } else {
            this.setState({
                isCameraFlashMenuVisible: true,
            });
        }
    }

    // Changes the flash mode, occurs when user chooses new mode from flash menu
    private changeFlashMode = (newMode: any): void => {
        this.setState({
            cameraFlashMode: newMode,

            // Immediately close menu after
            // Because cannot take picture with menu open
            isCameraFlashMenuVisible: false
        });
    }

    // Returns the icon name based on the current flash mode
    private getCurrentFlashMode = (): any => {
        if (this.state.cameraFlashMode === Camera.Constants.FlashMode.on) {
            return (
                <IconButton
                    icon="flash"
                    color={Colours.white}
                    size={this.state.topCameraBarHeight * 0.4}
                    onPress={this.changeFlashModeMenuVisibility}
                />
            );
        } else if (this.state.cameraFlashMode === Camera.Constants.FlashMode.auto) {
            return (
                <IconButton
                    icon="flash-auto"
                    color={Colours.white}
                    size={this.state.topCameraBarHeight * 0.4}
                    onPress={this.changeFlashModeMenuVisibility}
                />
            );
        } else if (this.state.cameraFlashMode === Camera.Constants.FlashMode.off) {
            return (
                <IconButton
                    icon="flash-off"
                    color={Colours.white}
                    size={this.state.topCameraBarHeight * 0.4}
                    onPress={this.changeFlashModeMenuVisibility}
                />
            );
        } else if (this.state.cameraFlashMode === Camera.Constants.FlashMode.torch) {
            return (
                <IconButton
                    icon="flashlight"
                    color={Colours.white}
                    size={this.state.topCameraBarHeight * 0.4}
                    onPress={this.changeFlashModeMenuVisibility}
                />
            );
        } else {
            Logger.error('Flash type is of unknown type, could not change flash type')
            return ''
        }
    }

    // Go to Settings screen when the settings button is touched
    private transitionToSettingsScreen = (): void => {
        Logger.trace('Trying to navigate from Camera screen to Settings screen');

        this.props.navigation.push(
            'SettingsScreen'
        )
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

    // Go to prediction screen when picture is taken
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

    // Subcomponent of top camera bar, so code is not duplicated (2 variations of camera component)
    private renderTopCameraBar = (backgroundColor: string) => {
        const topCameraBarHeight = (
            this.state.topCameraBarHeight > 0 ?
                this.state.topCameraBarHeight
            :
                screenHeight / 12
        );

        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    height: topCameraBarHeight,
                    backgroundColor: backgroundColor,
                }}
            >
                {/* Camera view switch button */}
                <IconButton
                    icon="camera-switch"
                    color={Colours.white}
                    size={topCameraBarHeight * 0.4}
                    onPress={this.flipCameraView}
                />

                {/* Flash mode change button */}
                <Menu
                    contentStyle={{
                        alignItems: 'flex-start',
                        backgroundColor: Colours.gray[900],
                    }}
                    visible={this.state.isCameraFlashMenuVisible}
                    onDismiss={this.changeFlashModeMenuVisibility}
                    anchor={this.getCurrentFlashMode()}
                >
                    <Button
                        labelStyle={{
                            fontSize: Normalizer.fontPixel(40),
                            color: Colours.white,
                        }}
                        icon={() => (
                            <Avatar.Icon
                                style={{ backgroundColor: Colours.transparent }}
                                icon="flash-off"
                                color={Colours.white}
                                size={topCameraBarHeight * 0.65}
                            />
                        )}
                        color={Colours.green[500]}
                        onPress={() => { this.changeFlashMode(Camera.Constants.FlashMode.off) }}
                    >
                        Flash Off
                    </Button>
                    <Button
                        labelStyle={{
                            fontSize: Normalizer.fontPixel(40),
                            color: Colours.white,
                        }}
                        icon={() => (
                            <Avatar.Icon
                                style={{ backgroundColor: Colours.transparent }}
                                icon="flash-auto"
                                color={Colours.white}
                                size={topCameraBarHeight * 0.65}
                            />
                        )}
                        color={Colours.green[500]}
                        onPress={() => { this.changeFlashMode(Camera.Constants.FlashMode.auto) }}
                    >
                        Flash Auto
                    </Button>
                    <Button
                        labelStyle={{
                            fontSize: Normalizer.fontPixel(40),
                            color: Colours.white,
                        }}
                        icon={() => (
                            <Avatar.Icon
                                style={{ backgroundColor: Colours.transparent }}
                                icon="flash"
                                color={Colours.white}
                                size={topCameraBarHeight * 0.65}
                            />
                        )}
                        color={Colours.green[500]}
                        onPress={() => { this.changeFlashMode(Camera.Constants.FlashMode.on) }}
                    >
                        Flash On
                    </Button>
                    <Button
                        labelStyle={{
                            fontSize: Normalizer.fontPixel(40),
                            color: Colours.white,
                        }}
                        icon={() => (
                            <Avatar.Icon
                                style={{ backgroundColor: Colours.transparent }}
                                icon="flashlight"
                                color={Colours.white}
                                size={topCameraBarHeight * 0.65}
                            />
                        )}
                        color={Colours.green[500]}
                        onPress={() => { this.changeFlashMode(Camera.Constants.FlashMode.torch) }}
                    >
                        Torch
                    </Button>
                </Menu>

                {/* Settings button */}
                <IconButton
                    icon="cog"
                    color={Colours.white}
                    size={topCameraBarHeight * 0.4}
                    onPress={this.transitionToSettingsScreen}
                />
            </View>
        );
    }

    // Subcomponent of zoom control, so code is not duplicated (2 variations of camera component)
    private renderZoomControl = (cameraWidth: number) => {
        const zoomControlLengthPercentageOfCameraPreview = '60%';
        const zoomControlTranslateLeft = parseFloat(zoomControlLengthPercentageOfCameraPreview) / 200;

        return (
            <View
                style={{
                    alignSelf: 'flex-end',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    borderRadius: 20,
                    height: cameraWidth * 0.1,  // left to right length (width)
                    width: zoomControlLengthPercentageOfCameraPreview,  // bottom to top length (height)
                    transform: [
                        {rotate: "-90deg"},

                        // Rotated in the middle, so must translate by half of its length
                        // Subtracted by a small amount as left padding to clearly show the control
                        {translateY: cameraWidth * zoomControlTranslateLeft - cameraWidth * 0.07},
                    ]
                }}
            >
                <Slider
                    style={{
                        height: cameraWidth,
                        backgroundColor: Colours.gray[500] + "22",
                    }}
                    thumbTintColor={Colours.lightGreen[700]}
                    minimumTrackTintColor={Colours.lightGreen[700]}
                    maximumTrackTintColor={Colours.black}
                    minimumValue={0}
                    maximumValue={1}
                    onValueChange={(value) => this.setState({ cameraZoom: value })}
                />
            </View>
        );
    }


    render() {
        if (this.state.isScreenFocused === true) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'space-between',
                        backgroundColor: Colours.gray[900],
                    }}
                >
                    <StatusBar hidden />

                    {/* Display opaque top camera bar with its buttons above camera */}
                    {/* For smaller phones, top camera bar is set to 0 to save space;
                        the bar is transparent and ontop of the camera preview */}
                    {this.state.topCameraBarHeight > 0 ? (
                        <View>
                            {this.renderTopCameraBar(Colours.gray[900])}
                            <Camera
                                style={{
                                    justifyContent: 'center',
                                    height: this.state.cameraHeight,
                                    width: this.state.cameraWidth,
                                }}
                                ratio={this.state.cameraRatio}
                                type={this.state.cameraViewType}
                                flashMode={this.state.cameraFlashMode}
                                zoom={this.state.cameraZoom}
                                ref={(ref) => { this.camera = ref }}
                            >
                                {this.renderZoomControl(this.state.cameraWidth)}
                            </Camera>
                        </View>
                    ) : (
                        <Camera
                            style={{
                                justifyContent: 'center',
                                height: this.state.cameraHeight,
                                width: this.state.cameraWidth,
                            }}
                            ratio={this.state.cameraRatio}
                            type={this.state.cameraViewType}
                            flashMode={this.state.cameraFlashMode}
                            zoom={this.state.cameraZoom}
                            ref={(ref) => { this.camera = ref }}
                        >
                            {this.renderTopCameraBar(Colours.transparent)}
                            {this.renderZoomControl(this.state.cameraWidth)}
                        </Camera>
                    )}

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
                    >

                    </View>

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