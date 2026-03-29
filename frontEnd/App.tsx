import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Landing from './screens/Landing/Landing';
import Splash from './screens/Splash/Splash';
import Subject from './screens/Subject/Subject';
import { screeName } from './utils/Title';

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
