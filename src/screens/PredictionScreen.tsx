import React, { Component } from 'react';
import { 
    View,
    Dimensions,
    Animated,
    ScrollView,
    StatusBar,
} from 'react-native';

import * as ImageManipulator from 'expo-image-manipulator'
import LottieView from 'lottie-react-native';

import { Logger } from '@actions/Log';
import { styles } from '@config/Styles';
import ClassifyImage from '@actions/ClassifyImage';
import PredictionCards from '@components/PredictionCards';
import Breed from '@components/Breed';

const loadingAnimation = require('@assets/like.json')


interface Props {
    navigation: any,
    route: any,
}


interface States {
    screenHeight: number,
    screenWidth: number,
    artificialPredictionDelay: number,
    showPredictionsAnimationDuration: number,
    initialAnimationDelay: number,
    initialAnimationDuration: number,
    bottomBarFinalHeight: number,
    isLoadingDone: boolean,
    predictions: Breed[],
}


class PredictionScreen extends Component<Props, States> {
    constructor(props: any) {
        super(props);
        this.state = {
            screenHeight: Dimensions.get('window').height,
            screenWidth: Dimensions.get('window').width,

            artificialPredictionDelay: 3000,
            showPredictionsAnimationDuration: 300,

            initialAnimationDelay: 900,
            initialAnimationDuration: 300,
            bottomBarFinalHeight: 6 * Dimensions.get('window').height / 10,

            isLoadingDone: false,
            predictions: [],
        };

        this.params = this.props.route.params;

        Logger.trace('Navigated to Prediction screen');
    }

    private params: any;

    private imageAnimation: Animated.Value = new Animated.Value(0);
    private bottomBarAnimation: Animated.Value = new Animated.Value(0);
    private scrollViewAnimation: Animated.Value = new Animated.Value(Dimensions.get('window').width);

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
            <View style={styles.screenContainer}>
                <StatusBar hidden />
                <View style={[styles.predictionTopBar, { height: this.params.topCameraBarHeight }]} />
                <Animated.Image
                    style={{
                        height: this.params.cameraHeight,
                        width: this.params.cameraWidth,
                        transform: [{ translateY: this.imageAnimation }],
                    }}
                    source={{ uri: this.params.imageUri }}
                />
                <Animated.View
                    style={[
                        styles.predictionContainer, {
                            height: this.state.bottomBarFinalHeight,
                            transform: [{ translateY: this.bottomBarAnimation }],
                        }
                    ]}
                >
                    {this.state.isLoadingDone === true ? (
                        <Animated.ScrollView
                            style={[
                                styles.predictionScrollView, {
                                    width: "100%",
                                    transform: [{ translateX: this.scrollViewAnimation }],
                                }
                            ]}

                            // To center the card in the view:
                            // Assume padding is reference to one side of padding and paddingLeft == paddingRight
                            // (1 - Percentage of cardWidth) / 2 = contentContainerPadding + cardPadding
                            // contentContainerPadding + cardPadding = 2 * cardPadding + visual of next card
                            contentContainerStyle={{
                                alignItems: "center",
                                justifyContent: "center",
                                paddingLeft: this.state.screenWidth * 0.05,
                                paddingRight: this.state.screenWidth * 0.05,
                            }}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            overScrollMode="never"
                            decelerationRate={0.96}
                        >
                            <PredictionCards
                                navigation={this.props.navigation}
                                cardPadding={this.state.screenWidth * 0.03}
                                cardWidth={this.state.screenWidth * 0.84}
                                breed={this.state.predictions[0]}
                            />
                            <PredictionCards
                                navigation={this.props.navigation}
                                cardPadding={this.state.screenWidth * 0.03}
                                cardWidth={this.state.screenWidth * 0.84}
                                breed={this.state.predictions[1]}
                            />
                            <PredictionCards
                                navigation={this.props.navigation}
                                cardPadding={this.state.screenWidth * 0.03}
                                cardWidth={this.state.screenWidth * 0.84}
                                breed={this.state.predictions[2]}
                            />
                            <PredictionCards
                                navigation={this.props.navigation}
                                cardPadding={this.state.screenWidth * 0.03}
                                cardWidth={this.state.screenWidth * 0.84}
                                breed={this.state.predictions[3]}
                            />
                            <PredictionCards
                                navigation={this.props.navigation}
                                cardPadding={this.state.screenWidth * 0.03}
                                cardWidth={this.state.screenWidth * 0.84}
                                breed={this.state.predictions[4]}
                            />
                        </Animated.ScrollView>
                    ) : (
                        <LottieView source={loadingAnimation} autoPlay loop />
                    )}
                </Animated.View>
            </View>
        );
    }
}

export default PredictionScreen;