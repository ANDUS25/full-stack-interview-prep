import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Color } from '../Utils/Colors';

const CustomButton = ({ ...props }) => {
  const { name, style } = props;
  return (
    <TouchableOpacity style={style ?? styles.buttonContainer}>
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
  },
  buttonNameView: { color: Color.White, textAlign: 'center' },
});
