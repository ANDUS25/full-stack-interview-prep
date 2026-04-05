import LottieView from 'lottie-react-native';
import React from 'react';

const { width, height } = Dimensions.get('screen');

const CustomAnimation = ({ ...props }) => {
  const { path } = props;

  return (
    <LottieView
      source={path}
      autoPlay={true}
      loop={true}
      style={style.lottie}
    />
  );
};

import { Dimensions, StyleSheet } from 'react-native';

const style = StyleSheet.create({
  lottie: { width: width, height: height, alignSelf: 'center' },
});

export default CustomAnimation;
