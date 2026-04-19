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
import { Color } from './utils/Colors';

const RootStack = createNativeStackNavigator({
  screens: {
    [screenName.SPLASH]: {
      screen: Splash,
      options: {
        title: screenName.SPLASH,
        headerShown: false,
      },
    },
    [screenName.HOME]: {
      screen: Landing,
      options: {
        title: screenName.HOME,
        headerShown: true,
        headerTitleAlign: 'center',
        headerBackButtonDisplayMode: 'minimal',
        headerTitleStyle: {
          fontFamily: 'Nunito-MediumItalic',
          color: Color.White,
        },
      },
    },
    [screenName.SUBJECT]: {
      screen: Subject,
      options: {
        title: screenName.SUBJECT,
        headerShown: true,
        headerTitleAlign: 'center',
        headerTintColor: Color.White,
        headerTitleStyle: {
          fontFamily: 'Nunito-MediumItalic',
          color: Color.White,
        },
      },
    },
    [screenName.NEW_QUESTION]: {
      screen: NewQuestion,
      options: {
        title: screenName.NEW_QUESTION,
        headerShown: true,
        headerTitleAlign: 'center',
        headerTintColor: Color.White,
        headerTitleStyle: {
          fontFamily: 'Nunito-MediumItalic',
          color: Color.White,
        },
      },
    },
    [screenName.UPDATE_QUESTION]: {
      screen: UpdateQuestion,
      options: ({ route }: any) => ({
        title:
          route?.params?.isComingFrom === screenName.HOME
            ? screenName.ADD_SUBJECT
            : screenName.UPDATE_QUESTION,
        headerShown: true,
        headerTitleAlign: 'center',
        headerTintColor: Color.White,
        headerTitleStyle: {
          fontFamily: 'Nunito-MediumItalic',
          color: Color.White,
        },
      }),
    },
  },
  screenOptions: {
    headerTintColor: Color.White,
    headerStyle: { backgroundColor: Color.ThemeColor },
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
