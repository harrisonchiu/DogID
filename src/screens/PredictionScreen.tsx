import React, { Component } from 'react';
import { 
    View,
    Animated,
    ScrollView,
    StatusBar,
} from 'react-native';

import * as ImageManipulator from 'expo-image-manipulator'
import LottieView from 'lottie-react-native';

import { Logger } from '@actions/Log';
import { Colours } from '@config/Colours';
import { Normalizer, screenHeight, screenWidth } from '@actions/Normalize';
import Breed from '@components/Breed';
import ClassifyImage from '@actions/ClassifyImage';
import PredictionCards from '@components/PredictionCards';

const loadingAnimation = require('@assets/loading-animation.json')


interface Props {
    navigation: any,
    route: any,
}


interface States {
    initialAnimationDelay: number,
    initialAnimationDuration: number,
    artificialPredictionDelay: number,
    showPredictionsAnimationDuration: number,
    bottomBarFinalHeight: number,
    isLoadingDone: boolean,
    predictions: Breed[],
}


class PredictionScreen extends Component<Props, States> {
    constructor(props: any) {
        super(props);
        this.state = {
            initialAnimationDelay: 900,
            initialAnimationDuration: 300,

            artificialPredictionDelay: 3000,
            showPredictionsAnimationDuration: 300,

            bottomBarFinalHeight: 6 * screenHeight / 10,

            isLoadingDone: false,
            predictions: [],
        };

        this.params = this.props.route.params;

        Logger.trace('Navigated to Prediction screen');
    }

    private params: any;

    private imageAnimation: Animated.Value = new Animated.Value(0);
    private bottomBarAnimation: Animated.Value = new Animated.Value(0);
    private scrollViewAnimation: Animated.Value = new Animated.Value(screenWidth);

    componentDidMount() {
        setTimeout(() => {
            // For some reason needs a delay or the animation is laggy
            this.animateImageMovingUp();
            this.animateBottomBarMovingUp();
            this.predictImage()
        }, this.state.initialAnimationDelay);
    }

    private animateImageMovingUp = (): void => {
        Animated.timing(this.imageAnimation, {
            toValue: - this.params.topCameraBarHeight,
            duration: this.state.initialAnimationDuration,
            useNativeDriver: true,
        }).start();
        Logger.trace('Animating image moving up');
    }

    private animateBottomBarMovingUp = (): void => {
        Animated.timing(this.bottomBarAnimation, {
            toValue: this.params.bottomCameraBarHeight - this.state.bottomBarFinalHeight,
            duration: this.state.initialAnimationDuration,
            useNativeDriver: true,
        }).start();
        Logger.trace('Animating bottom bar moving up');
    }

    private animateScrollViewMovingLeft = (): void => {
        Animated.timing(this.scrollViewAnimation, {
            toValue: 0,
            duration: this.state.showPredictionsAnimationDuration,
            useNativeDriver: true,
        }).start();
        Logger.trace('Animating predictions scroll view moving left');
    }

    private predictImage = async(): Promise<void> => {
        // Resize image to fix model input layer
        Logger.info('Started resizing image to fit model input size');
        const resizedImage = await ImageManipulator.manipulateAsync(
            this.params.imageUri,
            [{ resize: { width: 240, height: 240 } }],
            { base64: true },
        );
        Logger.info('Finished resizing image to fit model input size');

        const predictions = ClassifyImage(resizedImage, 5);

        // Set predictions and change the animation 3 seconds later
        // Only do these if the screen is still mounted
        if (this.props.navigation.isFocused()) {
            this.setState({
                predictions: predictions,
            }, () => {
                Logger.debug('Finished setting prediction state');

                // Artificial delay to show loading animation
                setTimeout(() => {
                    if (this.props.navigation.isFocused()) {
                        this.setState({
                            isLoadingDone: true
                        }, () => {
                            Logger.debug('Finished setting isLoadingDone state');
                            this.animateScrollViewMovingLeft();
                        });
                    } else {
                        Logger.warn('Navigation was not in focus when setting isLoadingDone state');
                        Logger.warn('User likely cancelled prediction before prediction was done');
                    }
                }, this.state.artificialPredictionDelay);
            });
        }
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    backgroundColor: Colours.gray[900],
                }}
            >
                <StatusBar hidden />
                <View
                    style={{
                        alignItems: 'center',
                        backgroundColor: Colours.gray[900],
                        height: this.params.topCameraBarHeight,
                    }}
                />
                <Animated.Image
                    style={{
                        height: this.params.cameraHeight,
                        width: this.params.cameraWidth,
                        transform: [{ translateY: this.imageAnimation }],
                    }}
                    source={{ uri: this.params.imageUri }}
                />
                <Animated.View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: Colours.gray[200],
                        height: this.state.bottomBarFinalHeight,
                        transform: [{ translateY: this.bottomBarAnimation }],
                    }}
                >
                    {this.state.isLoadingDone === true ? (
                        <Animated.ScrollView
                            style={{
                                flex: 1,
                                width: '100%',
                                backgroundColor: Colours.transparent,
                                transform: [{ translateX: this.scrollViewAnimation }],
                            }}

                            // To center the card in the view:
                            // Assume padding is reference to one side of padding and paddingLeft == paddingRight
                            // (1 - Percentage of cardWidth) / 2 = contentContainerPadding + cardPadding
                            // contentContainerPadding + cardPadding = 2 * cardPadding + visual of next card
                            contentContainerStyle={{
                                alignItems: "center",
                                justifyContent: "center",
                                paddingLeft: screenWidth * 0.05,
                                paddingRight: screenWidth * 0.05,
                            }}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            overScrollMode="never"
                            decelerationRate={0.96}
                        >
                            <PredictionCards
                                navigation={this.props.navigation}
                                cardPadding={screenWidth * 0.03}
                                cardWidth={screenWidth * 0.84}
                                breed={this.state.predictions[0]}
                            />
                            <PredictionCards
                                navigation={this.props.navigation}
                                cardPadding={screenWidth * 0.03}
                                cardWidth={screenWidth * 0.84}
                                breed={this.state.predictions[1]}
                            />
                            <PredictionCards
                                navigation={this.props.navigation}
                                cardPadding={screenWidth * 0.03}
                                cardWidth={screenWidth * 0.84}
                                breed={this.state.predictions[2]}
                            />
                            <PredictionCards
                                navigation={this.props.navigation}
                                cardPadding={screenWidth * 0.03}
                                cardWidth={screenWidth * 0.84}
                                breed={this.state.predictions[3]}
                            />
                            <PredictionCards
                                navigation={this.props.navigation}
                                cardPadding={screenWidth * 0.03}
                                cardWidth={screenWidth * 0.84}
                                breed={this.state.predictions[4]}
                            />
                        </Animated.ScrollView>
                    ) : (
                        <View
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <LottieView
                                style={{
                                    alignItems: 'center',
                                    height: '80%',
                                    width: '80%',
                                }}
                                source={loadingAnimation}
                                autoPlay
                                loop
                            />
                        </View>
                    )}
                </Animated.View>
            </View>
        );
    }
}

export default PredictionScreen;