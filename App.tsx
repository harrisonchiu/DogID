import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import  { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import LoadingScreen from './src/screens/LoadingScreen';
import CameraScreen from './src/screens/CameraScreen';
import PredictionScreen from './src/screens/PredictionScreen';
import { createAppContainer } from 'react-navigation';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer theme={DarkTheme}>
            <Stack.Navigator initialRouteName="Loading" screenOptions={{ headerShown: false, stackAnimation: 'fade' }}>
                <Stack.Screen name="Loading" component={LoadingScreen} />
                <Stack.Screen name="Camera" component={CameraScreen} />
                <Stack.Screen name="Prediction" component={PredictionScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}