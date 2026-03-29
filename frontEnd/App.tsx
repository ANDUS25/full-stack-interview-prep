import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Landing from './Screens/Landing/Landing';
import Splash from './Screens/Splash/Splash';
import { screeName } from './utils/Title';
import Subject from './Screens/Subject/Subject';

const RootStack = createNativeStackNavigator({
  screens: {
    Splash: {
      screen: Splash,
      options: {
        title: screeName.SPLASH,
        headerShown: false,
      },
    },
    Home: {
      screen: Landing,
      options: {
        title: screeName.HOME,
        headerShown: true,
      },
    },
    Subject: {
      screen: Subject,
      options: {
        title: screeName.SUBJECT,
        headerShown: true,
      },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

function App() {
  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
}

export default App;
