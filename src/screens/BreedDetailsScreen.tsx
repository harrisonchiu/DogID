import React, { Component } from 'react';
import {
    View,
    Image,
    Dimensions,
} from 'react-native';

import { Logger } from '@actions/Log';


interface Props {
    navigation: any,
    route: any,
}

interface States {
    screenHeight: number,
    screenWidth: number,
}


class BreedDetailsScreen extends Component<Props, States> {
    constructor(props: any) {
        super(props);
        this.state = {
            screenHeight: Dimensions.get('window').height,
            screenWidth: Dimensions.get('window').width,
        }

        this.params = this.props.route.params;

        Logger.trace('Navigated to BreedDetails screen');
    }

    private params: any;

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Image 
                    style={{
                        flex: 2,
                        width: this.state.screenWidth,
                    }}
                    source={this.params.image}
                />
                <View style={{ flex: 3 }} />
            </View>
        );
    }
}

export default BreedDetailsScreen