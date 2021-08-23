import React from 'react';
import { LogBox } from 'react-native';

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import LoadingScreen from '@screens/LoadingScreen';
import CameraScreen from '@screens/CameraScreen';
import PredictionScreen from '@screens/PredictionScreen';
import BreedDetailsScreen from '@screens/BreedDetailsScreen';
import SettingsScreen from '@screens/SettingsScreen';


LogBox.ignoreLogs([
 'Non-serializable values were found in the navigation state',
]);


const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="LoadingScreen"
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
                cardOverlayEnabled: true,
            }}
            mode="modal"
        >
            <Stack.Screen
                name="LoadingScreen"
                component={LoadingScreen}
            />
            <Stack.Screen
                name="CameraScreen"
                component={CameraScreen}
                options={{ animationEnabled: false }}
            />
            <Stack.Screen 
                name="PredictionScreen"
                component={PredictionScreen}
                options={{ animationEnabled: false }}
            />
            <Stack.Screen
                name="BreedDetailsScreen"
                component={BreedDetailsScreen}
                options={{ ...TransitionPresets.ModalSlideFromBottomIOS }}
            />
            <Stack.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={{ ...TransitionPresets.ModalSlideFromBottomIOS }}
            />
        </Stack.Navigator>
    )
}

export default AppNavigator;