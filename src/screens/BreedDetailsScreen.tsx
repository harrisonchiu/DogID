import React, { Component } from 'react';
import {
    View,
    Animated,
    ScrollView,
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


interface Props {
    navigation: any,
    route: any,
}


class BreedDetailsScreens extends Component<Props> {
    constructor(props: any) {
        super(props);

        this.breed = this.props.route.params.breed;
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
    }

    private breed: any;
    private scrollY: Animated.Value;
    private imageScale: Animated.AnimatedInterpolation;
    private scrollViewBorderRadius: Animated.AnimatedInterpolation;

    renderChips = () => {
        return this.breed.getCoat().map((prop: string, key: string) => {
            return (
                <Chip
                    key={key}
                    style={{
                        alignSelf: 'flex-start',
                        marginRight: '3%',
                        marginTop: '2%',
                    }}
                    textStyle={{
                        fontSize: Normalizer.fontPixel(44),
                    }}
                >
                    {prop}
                </Chip>
            );
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
                        height: screenHeight * 0.4,
                        width: screenWidth,
                        transform: [{ scale: this.imageScale }],
                    }}
                    source={this.breed.getPicture()}
                />
                <Animated.ScrollView
                    style={{ paddingTop: screenHeight * 0.4 }}
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
                            height: screenHeight * 1.7,
                            borderTopLeftRadius: this.scrollViewBorderRadius,
                            borderTopRightRadius: this.scrollViewBorderRadius,
                        }}
                    >
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
                                        paddingTop: '3%',
                                        fontWeight: 'bold',
                                        fontSize: Normalizer.fontPixel(90),
                                        lineHeight: Normalizer.fontPixel(90),
                                    }}
                                >
                                    {this.breed.getName()}
                                </Title>
                                <Paragraph
                                    style={{
                                        paddingTop: '2%',
                                        fontSize: Normalizer.fontPixel(67),
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    {this.breed.getGroup()}
                                </Paragraph>

                                <View style={{ paddingTop: '2%', flexWrap: "wrap", flexDirection: 'row' }}>
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
                                information={this.breed.getOrigin()}
                                position='left'
                            />

                            <FlashCards
                                title='Lifespan (yrs)'
                                information={this.breed.getLifespanString()}
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
                                information={this.breed.getHeightString()}
                                position='left'
                            />

                            <FlashCards
                                title='Weight (kg)'
                                information={this.breed.getWeightString()}
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
                                        {this.breed.getDescription()}
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
                            <RatingCards type='Friendliness' rating={this.breed.getFriendliness()} />
                            <RatingCards type='Energy' rating={this.breed.getEnergy()} />
                            <RatingCards type='Grooming Needs' rating={this.breed.getGroomingNeeds()} />
                        </View>

                    </Animated.View>
                </Animated.ScrollView>
            </View>
        );
    }
}

export default BreedDetailsScreens