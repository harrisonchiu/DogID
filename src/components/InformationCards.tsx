import React, { Component } from 'react';
import {
    View,
    Dimensions,
} from 'react-native';
import {
    Card,
    Title,
    Paragraph,
} from 'react-native-paper';

import { Colours } from '@config/Colours';


class InformationCards extends Component {
    render() {
        return (
            <Card
                style={{
                    borderRadius: 12,
                }}
                elevation={8}
            >
                <Card.Content>
                    <Title>Title</Title>
                    <Paragraph>Paragraph</Paragraph>
                </Card.Content>

            </Card>
        );
    }
}

export default InformationCards;