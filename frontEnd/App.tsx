import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Landing from './screens/Landing/Landing';
import NewQuestion from './screens/NewQuestion/NewQuestion';
import Splash from './screens/Splash/Splash';
import Subject from './screens/Subject/Subject';
import { screenName } from './utils/Title';

const RootStack = createNativeStackNavigator({
  screens: {
    Splash: {
      screen: Splash,
      options: {
        title: screenName.SPLASH,
        headerShown: false,
      },
    },
    Home: {
      screen: Landing,
      options: {
        title: screenName.HOME,
        headerShown: true,
      },
    },
    Subject: {
      screen: Subject,
      options: {
        title: screenName.SUBJECT,
        headerShown: true,
      },
    },
    'New Question': {
      screen: NewQuestion,
      options: {
        title: screenName.NEW_QUESTION,
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
