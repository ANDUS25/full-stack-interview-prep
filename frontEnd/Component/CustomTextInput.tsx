import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

interface CustomTextInputProps {
  placeHolder: string;
  value: string;
  onChange: (text: string) => void;
  multiline?: boolean;
}

const CustomTextInput = ({ ...props }: CustomTextInputProps) => {
  const { placeHolder, value, onChange, multiline } = props;

  return (
    <TextInput
      placeholder={placeHolder}
      value={value}
      onChangeText={onChange}
      style={styles.textStyle}
      multiline={multiline}
    />
  );
};

const styles = StyleSheet.create({
  textStyle: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
});

export default CustomTextInput;
