import React, { Component } from 'react';
import {
    View,
    Animated,
    StatusBar,
} from 'react-native';
import {
    Card,
    Title,
    Paragraph,
    Chip,
} from 'react-native-paper';

import { Logger } from '@actions/Log';
import { Colours } from '@config/Colours';
import { Normalizer, screenHeight, screenWidth } from '@actions/Normalize';
import Breed from '@components/Breed';
import { FlashCards, RatingCards } from '@components/BreedInformationCards';


interface BreedProp {
    breed: Breed,
}


// Handles the information displayed in the info container
class BreedDetailsContent extends Component<BreedProp> {
    renderChips = () => {
        return this.props.breed.getCoat().map((item: string, key: number) => {
            return (
                <Chip
                    key={key}
                    style={{
                        alignSelf: 'flex-start',
                        marginRight: '3%',
                        marginTop: '2%',
                    }}
                    textStyle={{
                        fontSize: Normalizer.fontPixel(40),
                    }}
                >
                    {item}
                </Chip>
            );
        });
    }

    render() {
        return (
            <View>
                <Card 
                    style={{
                        flex: 0,
                        width: screenWidth,
                        borderRadius: 12,
                    }}
                    elevation={0}
                >
                    <Card.Content
                        style={{
                            paddingLeft: '7%',
                            paddingRight: '7%',
                            backgroundColor: Colours.lightGreen[500],
                            alignContent: 'flex-start',
                        }}
                    >
                        <Title
                            style={{
                                textAlignVertical: 'top',
                                paddingTop: '2%',
                                fontWeight: 'bold',
                                fontSize: Normalizer.fontPixel(90),
                                lineHeight: Normalizer.fontPixel(90),
                            }}
                        >
                            {this.props.breed.getName()}
                        </Title>
                        <Paragraph
                            style={{
                                paddingTop: '1%',
                                fontSize: Normalizer.fontPixel(67),
                                lineHeight: Normalizer.fontPixel(67),
                                textTransform: 'capitalize',
                            }}
                        >
                            {this.props.breed.getGroup() + " Group"}
                        </Paragraph>

                        <Paragraph
                            style={{
                                paddingTop: '3%',
                                opacity: 0.6,
                                color: Colours.gray[900],
                                fontSize: Normalizer.fontPixel(51),
                            }}
                        >
                            Physical coat description:
                        </Paragraph>
                        <View style={{ paddingTop: '0%', flexWrap: "wrap", flexDirection: 'row' }}>
                            {this.renderChips()}
                        </View>
                    </Card.Content>
                </Card>

                <View
                    style={{
                        flex: 0,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: '5%',
                        width: '100%',
                    }}
                >
                    <FlashCards
                        title='Origin'
                        information={this.props.breed.getOrigin()}
                        position='left'
                    />

                    <FlashCards
                        title='Lifespan (yrs)'
                        information={this.props.breed.getLifespanString()}
                        position='right'
                    />
                </View>

                <View
                    style={{
                        flex: 0,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: '3%',
                        marginBottom: '3%',
                        width: '100%',
                    }}
                >
                    <FlashCards
                        title='Height (cm)'
                        information={this.props.breed.getHeightString()}
                        position='left'
                    />

                    <FlashCards
                        title='Weight (kg)'
                        information={this.props.breed.getWeightString()}
                        position='right'
                    />
                </View>

                <View
                    style={{
                        flex: 0,
                        alignItems: 'center',
                        width: '100%',
                        marginTop: '3%',
                    }}
                >
                    <Card
                        style={{
                            width: '90%',
                            backgroundColor: Colours.lightGreen[500],
                        }}
                    >
                        <Card.Content>
                            <Title
                                style={{
                                    lineHeight: Normalizer.fontPixel(72),
                                    fontSize: Normalizer.fontPixel(62),
                                    fontWeight: 'bold',
                                }}
                            >
                                Description
                            </Title>
                            <Paragraph
                                style={{
                                    lineHeight: Normalizer.fontPixel(60),
                                    fontSize: Normalizer.fontPixel(50),
                                }}
                            >
                                {this.props.breed.getDescription()}
                            </Paragraph>
                        </Card.Content>
                    </Card>
                </View>

                <View
                    style={{
                        flex: 0,
                        alignItems: 'center',
                        width: '100%',
                        marginTop: '2%',
                    }}
                >
                    <RatingCards type='Friendliness' rating={this.props.breed.getFriendliness()} />
                    <RatingCards type='Energy' rating={this.props.breed.getEnergy()} />
                    <RatingCards type='Grooming Needs' rating={this.props.breed.getGroomingNeeds()} />
                </View>

            </View>
        );
    }
}


interface Props {
    navigation: any,
    route: any,
}


interface States {
    breed: Breed,
    breedPictureHeight: number,
    breedDetailsHeight: number,
}


// Handles the general info container, the picture header, and all its animations
class BreedDetailsScreen extends Component<Props, States> {
    constructor(props: any) {
        super(props);

        this.state = {
            breed: this.props.route.params.breed,
            breedPictureHeight: screenHeight * 0.4,
            breedDetailsHeight: screenHeight * 1.7,
        };

        this.scrollY = new Animated.Value(0);
        this.imageScale = this.scrollY.interpolate({
            inputRange: [0, screenHeight],
            outputRange: [1.2, 0.8],
            extrapolate: 'clamp',
        });
        this.scrollViewBorderRadius = this.scrollY.interpolate({
            inputRange: [0, 350],
            outputRange: [40, 0],
        });

        Logger.trace(`Navigated to Breed Details screen of ${this.state.breed.getName()}`);
        this.logSummaryOfBreed();
    }

    scrollY: Animated.Value;
    imageScale: Animated.AnimatedInterpolation;
    scrollViewBorderRadius: Animated.AnimatedInterpolation;

    logSummaryOfBreed = () => {
        Logger.info(`Showing breed info of ${this.state.breed.getName()}`);
        Logger.debug(`Breed is ${this.state.breed.getGroup()} group from ${this.state.breed.getOrigin()}`);
        Logger.debug(`Breed is ${this.state.breed.getHeightString()} cm tall`);
    }

    findDimensions = (layout: any) => {
        const {x, y, width, height} = layout;

        // height of all the content + height of image + some white space padding at bottom
        const breedDetailsHeight = height + this.state.breedPictureHeight + height * 0.02;

        Logger.debug(`Info container resized to ${breedDetailsHeight}`);

        this.setState({
            breedDetailsHeight: breedDetailsHeight,
        });
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: screenHeight,
                    backgroundColor: Colours.gray[900],
                }}
            >
                <StatusBar hidden={true} />
                <Animated.Image
                    style={{
                        overflow: 'hidden',
                        position: 'absolute',
                        top: 0,
                        height: this.state.breedPictureHeight,
                        width: screenWidth,
                        transform: [{ scale: this.imageScale }],
                    }}
                    source={this.state.breed.getPicture()}
                />
                <Animated.ScrollView
                    style={{ paddingTop: this.state.breedPictureHeight }}
                    contentContainerStyle={{
                        backgroundColor: Colours.transparent,
                    }}
                    onScroll={
                        Animated.event(
                            [{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
                            { useNativeDriver: true },
                        )
                    }
                    overScrollMode="never"
                    showsVerticalScrollIndicator={false}                
                >
                    <Animated.View
                        style={{
                            overflow: 'hidden',
                            backgroundColor: Colours.white,
                            width: screenWidth,
                            height: this.state.breedDetailsHeight,
                            borderTopLeftRadius: this.scrollViewBorderRadius,
                            borderTopRightRadius: this.scrollViewBorderRadius,
                        }}
                    >
                        <View onLayout={(event) => { this.findDimensions(event.nativeEvent.layout) }}>
                            <BreedDetailsContent breed={this.state.breed} />
                        </View>
                    </Animated.View>
                </Animated.ScrollView>
            </View>
        );
    }
}

export default BreedDetailsScreen;