import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Color } from '../utils/Colors';

interface CustomTextInputProps {
  placeHolder: string;
  value: string;
  onChange: (text: string) => void;
  multiline?: boolean;
  style?: any;
}

const CustomTextInput = ({ ...props }: CustomTextInputProps) => {
  const { placeHolder, value, onChange, multiline, style } = props;

  return (
    <TextInput
      placeholder={placeHolder}
      value={value}
      onChangeText={onChange}
      style={style || styles.textStyle}
      multiline={multiline}
    />
  );
};

const styles = StyleSheet.create({
  textStyle: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderColor: Color.Gray,
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    fontFamily: 'Nunito-Regular',
  },
});

export default CustomTextInput;
