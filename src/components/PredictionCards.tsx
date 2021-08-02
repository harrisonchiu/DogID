import React, { Component } from 'react';
import {
    View,
    Dimensions,
} from 'react-native';
import {
    Card,
} from 'react-native-paper';

import { Colours } from '@config/Colours';
import { BreedPictures } from '@components/BreedPictures'


interface Props {
    navigation: any,
    cardPadding: number,
    cardWidth: number,
    breedName: string,
    probability: number,
}


class PredictionCards extends Component<Props> {
    private probabilityText: string = 'Probability: ' + this.props.probability + '%'
    private breedPicture: any = BreedPictures[this.props.breedName]

    private transitionToBreedDetailsScreen = (): void => {
        this.props.navigation.push(
            'BreedDetailsScreen', {
                image: this.breedPicture,
            }
        )
    }

    render() {
        return (
            <View
                style={{
                    paddingLeft: this.props.cardPadding,
                    paddingRight: this.props.cardPadding,
                }}
            >
                <Card 
                    style={{
                        height: "80%",
                        width: this.props.cardWidth,
                        borderRadius: 12,
                        overflow: "hidden",
                    }}
                    elevation={8}
                    onPress={this.transitionToBreedDetailsScreen}
                >
                    <Card.Cover
                        style={{
                            flex: 10,
                        }}
                        source={this.breedPicture}
                    />
                    <Card.Title
                        style={{
                            flex: 0.02,
                            backgroundColor: "lightgreen",
                        }}
                        titleStyle={{
                            fontSize: 21,
                            fontWeight: "bold",
                        }}
                        subtitleStyle={{
                            fontSize: 16,
                        }}
                        title={this.props.breedName}
                        subtitle={this.probabilityText}
                    />
                </Card>
            </View>
        );
    }
}

export default PredictionCards;