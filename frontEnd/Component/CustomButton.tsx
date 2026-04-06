import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Color } from '../utils/Colors';

interface CustomButtonProps {
  name: string;
  onPress: () => void;
  style?: any;
}

const CustomButton: FC<CustomButtonProps> = ({ ...props }) => {
  const { name, style, onPress } = props;

  return (
    <TouchableOpacity style={[style, styles.buttonContainer]} onPress={onPress}>
      <Text style={styles.buttonNameView}>{name}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Color.Black,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    // justifyContent: 'center',
    // alignItems: 'center',
    // width: '40%',
  },
  buttonNameView: {
    color: Color.White,
    textAlign: 'center',
    // width: '100%',
  },
});
