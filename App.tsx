import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import AppNavigator from '@src/navigations/AppNavigator';

const App = () => {
    return (
        <NavigationContainer theme={ DarkTheme }>
            <AppNavigator></AppNavigator>
        </NavigationContainer>
    );
}

export default App