import React, { Component } from 'react';
import {
    View,
} from 'react-native';

import {
    Card,
    Title,
    Paragraph,
} from 'react-native-paper';

import { Colours } from '@config/Colours';
import { Normalizer } from '@actions/Normalize';


interface FlashCardsProps {
    title: string,
    information: string,
    position: string,
}


class FlashCards extends Component<FlashCardsProps> {
    constructor(props: any) {
        super(props);

        // Border radius: [topLeft, topRight, bottomLeft, bottomRight]
        if (this.props.position == 'left') {
            this.borderRadius = [-1, 0, -1, 0];
        } else {
            this.borderRadius = [0, -1, 0, -1];
        }
    }

    private borderRadius: [number, number, number, number];

    render() {
        return (
            <Card
                style={{
                    width: '45%',
                    height: '100%',
                    backgroundColor: Colours.lightGreen[500],
                    borderTopLeftRadius: this.borderRadius[0],
                    borderTopRightRadius: this.borderRadius[1],
                    borderBottomLeftRadius: this.borderRadius[2],
                    borderBottomRightRadius: this.borderRadius[3],
                }}
            >
                <Card.Content
                    style={{
                        alignItems: 'center',
                        paddingTop: '5%',
                        paddingBottom: '5%',
                    }}
                >
                    <Title
                        style={{
                            lineHeight: Normalizer.fontPixel(72),
                            fontSize: Normalizer.fontPixel(62),
                            fontWeight: 'bold',
                        }}
                        numberOfLines={1}
                    >
                        {this.props.title}
                    </Title>
                    <Paragraph
                        style={{
                            lineHeight: Normalizer.fontPixel(70),
                            fontSize: Normalizer.fontPixel(60),
                        }}
                        numberOfLines={1}
                    >
                        {this.props.information}
                    </Paragraph>
                </Card.Content>
            </Card>
        );
    }
}


interface RatingProps {
    type: string,
    rating: number,
}

class RatingCards extends Component<RatingProps> {
    render() {
        return (
            <Card
                style={{
                    marginTop: '4%',
                    width: '90%',
                    backgroundColor: Colours.lightGreen[500],
                }}
            >
                <Card.Content>
                    <Title
                        style={{
                            lineHeight: Normalizer.fontPixel(72),
                            fontSize: Normalizer.fontPixel(62),
                            fontWeight: 'bold',
                        }}
                    >
                        {this.props.type}
                    </Title>
                    <View
                        style={{
                            overflow: 'hidden',
                            marginTop: '1%',
                            height: Normalizer.heightPixel(47),
                            width: '95%',
                            borderRadius: 20,
                            backgroundColor: Colours.gray[800],
                        }}
                    >
                        <View
                            style={{
                                height: '100%',
                                width: (this.props.rating * 100 / 5) + "%",
                                borderRadius: 20,
                                backgroundColor: Colours.red[600],
                            }}
                        />
                    </View>
                </Card.Content>
            </Card>
        );
    }
}

export { FlashCards, RatingCards };