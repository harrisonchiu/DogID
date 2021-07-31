import React, { Component } from 'react';
import {
    View,
} from 'react-native';


interface Props {
    navigation: any,
}


class BreedDetailsScreen extends Component<Props> {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'blue' }}>
                <View style={{ backgroundColor: 'red' }} />
            </View>
        );
    }
}

export default BreedDetailsScreen