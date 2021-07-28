import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';

import { StyleColours } from '@config/Colours';
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
                    styles.cardContainer, {
                        paddingLeft: this.props.cardWidth * 0.03,
                        paddingRight: this.props.cardWidth * 0.03,
                        width: this.props.cardWidth
                    }
                ]}
            >
                <View style={styles.card}> 
                    <View style={styles.profilePicture}>
                        <Image
                            style={{
                                height: '100%',
                                width: '100%',
                            }}
                            source={this.breedPicture}
                        />
                    </View>
                    <View
                        style={[
                            styles.profileInformation, {
                                padding: this.props.cardWidth * 0.03
                            }
                        ]}
                    >
                        <Text style={styles.predictedBreedName}>
                            {this.props.breedName}
                        </Text>
                        <Text style={styles.predictedProbability}>
                            {this.probabilityText}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        backgroundColor: StyleColours.cardBackground,
    },
    card: {
        flex: 1,
        backgroundColor: StyleColours.card,
        borderRadius: 25,
        overflow: 'hidden',
    },
    profilePicture: {
        flex: 1,
        backgroundColor: StyleColours.profilePictureBackground,
    },
    profileInformation: {
        flex: 0.25,
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        backgroundColor: StyleColours.profileInformationBackground,
    },
    predictedBreedName: {
        flexShrink: 1,
        fontSize: 22,
    },
    predictedProbability: {
        fontSize: 18,
    },
});


export default Cards;