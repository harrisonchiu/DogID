import React, { Component } from 'react';
import {
    View,
    Image,
    Dimensions,
} from 'react-native';
import {
    Card,
    Title,
    Paragraph,
} from 'react-native-paper';

import { Logger } from '@actions/Log';
// import InformationCards from '@components/InformationCards';
import Breed from '@components/Breed';


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
        this.breed = this.props.route.params.breed;

        Logger.trace('Navigated to BreedDetails screen');
    }

    private params: any;
    private breed: Breed;

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Image 
                    style={{
                        flex: 2,
                        width: this.state.screenWidth,
                    }}
                    source={this.breed.getPicture()}
                />
                <View style={{ flex: 3 }}>
                    <Card>
                        <Card.Content>
                            <Title
                                style={{
                                    fontWeight: "bold",
                                    fontSize: 22,
                                }}
                            >
                                {this.breed.getName()}
                            </Title>
                            <Paragraph>
                                Paragraph
                            </Paragraph>
                        </Card.Content>
                    </Card>
                </View>
            </View>
        );
    }
}

export default BreedDetailsScreen