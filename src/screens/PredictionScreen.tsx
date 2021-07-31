import React, { Component, useRef } from 'react';
import { 
    View,
    Dimensions,
    Animated,
    TouchableOpacity,
    ScrollView,
    Text,
    FlatList,
    StatusBar,
} from 'react-native';

import * as ImageManipulator from 'expo-image-manipulator'
import LottieView from 'lottie-react-native';

import { Time } from '@actions/Log';
import { styles } from '@config/Styles';
import ClassifyImage from '@actions/ClassifyImage';
import Cards from '@components/Cards';

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
    predictions: [string[], number[]],
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
            predictions: [[], []],
        };

        this.params = this.props.route.params;

        console.log(Time() + '[INFO] Navigated to Prediction screen')
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
        console.log(Time() + '[DEBUG] Animated image moving up')
    }

    private animateBottomBarMovingUp = (): void => {
        Animated.timing(this.bottomBarAnimation, {
            toValue: this.params.bottomCameraBarHeight - this.state.bottomBarFinalHeight,
            duration: this.state.initialAnimationDuration,
            useNativeDriver: true,
        }).start();
        console.log(Time() + '[DEBUG] Animated bottom bar moving up')
    }

    private animateScrollViewMovingLeft = (): void => {
        Animated.timing(this.scrollViewAnimation, {
            toValue: 0,
            duration: this.state.showPredictionsAnimationDuration,
            useNativeDriver: true,
        }).start();
        console.log(Time() + '[DEBUG] Animated the predictions scroll view moving left')
    }

    private predictImage = async(): Promise<void> => {
        console.log(Time() + '[INFO] Started resizing image to fit model input size')
        const resizedImage = await ImageManipulator.manipulateAsync(
            this.params.imageUri,
            [{ resize: { width: 240, height: 240 } }],
            { base64: true },
        );
        console.log(Time() + '[INFO] Finished resizing image to fit model input size')

        const predictions = ClassifyImage(resizedImage, 5, 2);

        // Set predictions and change the animation 3 seconds later
        // Only do these if the screen is still mounted
        if (this.props.navigation.isFocused()) {
            this.setState({
                predictions: predictions,
            }, () => {
                console.log(Time() + '[DEBUG] Finished setting prediction state')

                // Artificial delay to show loading animation
                setTimeout(() => {
                    if (this.props.navigation.isFocused()) {
                        this.setState({
                            isLoadingDone: true
                        }, () => {
                            console.log(Time() + '[DEBUG] Finished setting isLoadingDone state')
                            this.animateScrollViewMovingLeft();
                        });
                    } else {
                        console.log(Time() + '[WARN] Navigation was not in focus when setting isLoadingDone state')
                        console.log(Time() + '[WARN] User likely cancelled prediction before prediction was done')
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
                            <Cards
                                cardPaddingLeft={this.state.screenWidth * 0.03}
                                cardPaddingRight={this.state.screenWidth * 0.03}
                                cardWidth={this.state.screenWidth * 0.84}
                                breedName={this.state.predictions[0][0]}
                                probability={this.state.predictions[1][0]}
                                navigation={this.props.navigation}
                            />
                            {/* <Cards
                                cardPaddingLeft={this.state.screenWidth * 0.03}
                                cardPaddingRight={this.state.screenWidth * 0.03}
                                cardWidth={this.state.screenWidth * 0.84}
                                breedName={this.state.predictions[0][1]}
                                probability={this.state.predictions[1][1]}
                            />
                            <Cards
                                cardPaddingLeft={this.state.screenWidth * 0.03}
                                cardPaddingRight={this.state.screenWidth * 0.03}
                                cardWidth={this.state.screenWidth * 0.84}
                                breedName={this.state.predictions[0][2]}
                                probability={this.state.predictions[1][2]}
                            />
                            <Cards
                                cardPaddingLeft={this.state.screenWidth * 0.03}
                                cardPaddingRight={this.state.screenWidth * 0.03}
                                cardWidth={this.state.screenWidth * 0.84}
                                breedName={this.state.predictions[0][3]}
                                probability={this.state.predictions[1][3]}
                            />
                            <Cards
                                cardPaddingLeft={this.state.screenWidth * 0.03}
                                cardPaddingRight={this.state.screenWidth * 0.03}
                                cardWidth={this.state.screenWidth * 0.84}
                                breedName={this.state.predictions[0][4]}
                                probability={this.state.predictions[1][4]}
                            /> */}
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