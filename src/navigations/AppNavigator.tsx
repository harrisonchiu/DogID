import React from 'react';

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import LoadingScreen from '@screens/LoadingScreen';
import CameraScreen from '@screens/CameraScreen';
import PredictionScreen from '@screens/PredictionScreen';
import BreedDetailsScreen from '@screens/BreedDetailsScreen';


type Routes = {
    LoadingScreen: undefined,
    CameraScreen: undefined,
    PredictionScreen: undefined,
    BreedDetailsScreen: undefined,
}

const Stack = createStackNavigator();

// TODO: different transitions for different pages
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
            <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
            <Stack.Screen name="CameraScreen" component={CameraScreen} options={{ animationEnabled: false }} />
            <Stack.Screen name="PredictionScreen" component={PredictionScreen} options={{ animationEnabled: false }} />
            <Stack.Screen name="BreedDetailsScreen" component={BreedDetailsScreen} options={{ ...TransitionPresets.ModalSlideFromBottomIOS }}  />
        </Stack.Navigator>
    )
}

export default AppNavigator;


/**
 * ...TransitionPresets.ModalSlideFromBottomIOS }}
 * 
 * 
 * import * as React from 'react';
import { View, Button, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs, TransitionPresets } from '@react-navigation/stack';

function Home({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home screen</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
}

function Profile({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile screen</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ ...TransitionPresets.RevealFromBottomAndroid        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

 */