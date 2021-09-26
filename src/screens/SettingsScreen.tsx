import React, { Component } from 'react';
import {
    View,
    StatusBar,
} from 'react-native';

import {
    List,
    Portal,
    Modal,
    Appbar,
    Title,
    Paragraph,
} from 'react-native-paper';

import { Logger } from '@actions/Log';
import { Colours } from '@config/Colours';
import { Normalizer, screenHeight, screenWidth } from '@actions/Normalize';
import aboutDogId from '@config/AboutDogId';


interface Props {
    navigation: any,
}


interface States {
    isAboutModalVisible: boolean,
}


class SettingsScreen extends Component<Props, States> {
    constructor(props: any) {
        super(props);
        this.state = {
            isAboutModalVisible: false,
        };

        Logger.trace('Navigated to Settings screen');
    }

    private toggleAboutModalVisibility = (): void => {
        this.setState({
            isAboutModalVisible: (this.state.isAboutModalVisible) ? false : true,
        });
    }

    // Go to Camera screen when the settings back button is touched
    private transitionToCameraScreen = (): void => {
        Logger.trace('Trying to navigate from Settings screen to Camera screen');

        this.props.navigation.pop()
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: Colours.white,
                }}
            >
                <StatusBar hidden />

                <Appbar.Header style={{ backgroundColor: Colours.red[400] }}>
                    <Appbar.BackAction onPress={this.transitionToCameraScreen} />
                    <Appbar.Content title="Settings" />
                </Appbar.Header>

                <List.Section>
                    <List.Item
                        title="About"
                        left={() => <List.Icon icon="information" />}
                        onPress={this.toggleAboutModalVisibility}
                    />
                </List.Section>

                <Portal>
                    <Modal
                        visible={this.state.isAboutModalVisible}
                        onDismiss={this.toggleAboutModalVisibility}
                        contentContainerStyle={{
                            height: '80%',
                            width: '100%',
                            justifyContent: 'flex-start',
                            paddingVertical: '3%',
                            paddingHorizontal: '3%',
                            backgroundColor: Colours.white,
                        }}
                    >
                        <Title>About DogID</Title>
                        <Paragraph>
                            {aboutDogId}
                        </Paragraph>
                    </Modal>
                </Portal>
            </View>
        );
    }
}

export default SettingsScreen;