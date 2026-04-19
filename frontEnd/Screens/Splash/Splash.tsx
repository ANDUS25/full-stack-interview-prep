import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import CustomAnimation from '../../component/CustomAnimation';
import { screenName } from '../../utils/Title';
import style from './styles';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate(screenName.HOME as never);
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={style.container}>
      <CustomAnimation path={require('../../assets/gif/Programmer.json')} />
    </View>
  );
};

export default Splash;
