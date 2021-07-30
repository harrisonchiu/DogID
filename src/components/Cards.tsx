import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import {
    Card,
    Title,
    Paragraph,
} from 'react-native-paper';

import { Colours } from '@config/Colours';
import { BreedPictures } from '@components/BreedPictures'


interface Props {
    onPressAction?: any,
    cardPaddingLeft: number,
    cardPaddingRight: number,
    cardWidth: number,
    breedName: string,
    probability: number,
}


class Cards extends Component<Props> {
    private probabilityText: string = 'Probability: ' + this.props.probability + '%'
    private breedPicture: any = BreedPictures[this.props.breedName]

    render() {
        return (
            <View
                style={{
                    paddingLeft: this.props.cardPaddingLeft,
                    paddingRight: this.props.cardPaddingRight,
                }}
            >
                <Card 
                    style={{
                        height: '80%',
                        width: this.props.cardWidth,
                        borderRadius: 12,
                        overflow: 'hidden',
                        elevation: 6,
                    }}
                    elevation={5}
                >
                    <Card.Cover
                        style={{
                            height: '80%',
                            width: '100%',
                        }}
                        source={this.breedPicture}
                    />
                    <Card.Title
                        style={{
                            backgroundColor: 'lightgreen',
                        }}
                        titleStyle={{
                            fontSize: 21,  // default is 20
                            fontWeight: 'bold',
                        }}
                        subtitleStyle={{
                            fontSize: 16,
                        }}
                        title={this.props.breedName}
                        subtitle={this.probabilityText}
                    />
                    <Card.Content style={{ backgroundColor: 'lightgreen' }}>
                        <View />
                    </Card.Content>
                </Card>
            </View>
        );
    }
}

export default Cards;