import React, { Component } from 'react';
import {
    View,
} from 'react-native';
import {
    Card,
} from 'react-native-paper';

import { Colours } from '@config/Colours';
import { Normalizer } from '@actions/Normalize';
import Breed from '@components/Breed';


interface Props {
    navigation: any,
    cardPadding: number,
    cardWidth: number,
    breed: Breed,
}


class PredictionCards extends Component<Props> {
    private breed: Breed = this.props.breed;
    private probabilityText: string = `Probability: ${this.breed.getProbability()}%`;

    private transitionToBreedDetailsScreen = (): void => {
        this.props.navigation.navigate(
            'BreedDetailsScreen', {
                breed: this.breed,
            }
        );
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
                        source={this.breed.getPicture()}
                    />
                    <Card.Title
                        style={{
                            flex: 0.02,
                            backgroundColor: Colours.green[600],
                        }}
                        titleStyle={{
                            fontSize: Normalizer.fontPixel(72),
                            fontWeight: "bold",
                        }}
                        subtitleStyle={{
                            fontSize: Normalizer.fontPixel(48),
                        }}
                        title={this.breed.getName()}
                        subtitle={this.probabilityText}
                    />
                </Card>
            </View>
        );
    }
}

export default PredictionCards;