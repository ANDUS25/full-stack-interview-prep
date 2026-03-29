import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import style from './styles';
import { screeName } from '../../utils/Title';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate(screeName.HOME as never);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={style.container}>
      <LottieView
        source={require('../../assets/Programmer.json')}
        autoPlay
        loop
        style={style.lottie}
      />
    </View>
  );
};

export default Splash;
