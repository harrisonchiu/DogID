import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';

import { cardStyles } from '@config/Styles';
import { BreedPictures } from '@components/BreedPictures'


interface Props {
    onPressAction?: any,
    breedName: string,
    probability: number,
    cardWidth: number,
}


class Cards extends Component<Props> {
    private probabilityText: string = 'Probability: ' + this.props.probability + '%'
    private breedPicture: any = BreedPictures[this.props.breedName]

    render() {
        return (
            <View
                style={[
                    cardStyles.cardContainer, {
                        paddingLeft: this.props.cardWidth * 0.03,
                        paddingRight: this.props.cardWidth * 0.03,
                        width: this.props.cardWidth,
                    }
                ]}
            >
                <View style={cardStyles.card}> 
                    <View style={cardStyles.profilePicture}>
                        <Image
                            style={{
                                height: '100%',
                                width: '100%',
                            }}
                            source={this.breedPicture}
                        />
                    </View>
                    <View style={cardStyles.profileInformation}>
                        <View style={cardStyles.profileBreedName}>
                            <Text style={cardStyles.predictedBreedNameText}>
                                {this.props.breedName}
                            </Text>
                        </View>
                        <View style={cardStyles.profileBreedProbability}>
                            <Text style={cardStyles.predictedBreedProbabilityText}>
                                {this.probabilityText}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

export default Cards;