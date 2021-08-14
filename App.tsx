import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';

import AppNavigator from '@src/navigations/AppNavigator';

const App = () => {
    return (
        <PaperProvider>
            <NavigationContainer theme={DarkTheme}>
                <AppNavigator />
            </NavigationContainer>
        </PaperProvider>
    );
}

export default App