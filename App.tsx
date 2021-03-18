import {
  BarlowCondensed_600SemiBold,
  useFonts,
} from '@expo-google-fonts/barlow-condensed';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import React, { ReactElement } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components';

import { RootStackParamList } from './routes/Route';
import { InputScreen, TrainingScreen } from './screens';
import TimerStore, { TimerStoreProvider } from './store/TimerStore';
import { lightTheme } from './theme/theme';

// Mobx root store.
const store = new TimerStore();

// React Navigation prop types.
const RootStack = createStackNavigator<RootStackParamList>();

export default function App(): ReactElement {
  // Custom font loading.
  const [fontsLoaded] = useFonts({
    BarlowCondensed_600SemiBold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ThemeProvider theme={lightTheme}>
        <TimerStoreProvider store={store}>
          <SafeAreaProvider>
            <NavigationContainer>
              <RootStack.Navigator initialRouteName="Home" headerMode="none">
                <RootStack.Screen name="Home" component={InputScreen} />
                <RootStack.Screen name="Training" component={TrainingScreen} />
              </RootStack.Navigator>
            </NavigationContainer>
            <StatusBar style="light" />
          </SafeAreaProvider>
        </TimerStoreProvider>
      </ThemeProvider>
    );
  }
}
