import React, { Component } from 'react';
import {
    View,
    Image,
} from 'react-native';


interface Props {
    navigation: any,
    route: any,
}


class BreedDetailsScreen extends Component<Props> {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'blue' }}>
                <Image 
                    style={{
                        flex: 1,
                    }}
                    source={this.props.route.params.image}
                />
            </View>
        );
    }
}

export default BreedDetailsScreen