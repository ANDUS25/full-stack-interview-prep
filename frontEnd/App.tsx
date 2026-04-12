import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Landing from './screens/Landing/Landing';
import NewQuestion from './screens/NewQuestion/NewQuestion';
import Splash from './screens/Splash/Splash';
import Subject from './screens/Subject/Subject';
import { screenName } from './utils/Title';
import UpdateQuestion from './screens/updateQuestion/UpdateQuestion';

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
        headerTitleAlign: 'center',
        headerBackVisible: false,
      },
    },
    Subject: {
      screen: Subject,
      options: {
        title: screenName.SUBJECT,
        headerShown: true,
        headerTitleAlign: 'center',
      },
    },
    'New Question': {
      screen: NewQuestion,
      options: {
        title: screenName.NEW_QUESTION,
        headerShown: true,
        headerTitleAlign: 'center',
      },
    },
    'Update Question': {
      screen: UpdateQuestion,
      options: {
        title: screenName.UPDATE_QUESTION,
        headerShown: true,
        headerTitleAlign: 'center',
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
