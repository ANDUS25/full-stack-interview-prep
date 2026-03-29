import React from 'react';
import { TextInput } from 'react-native';

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
      onChange={inputData => onChange(inputData)}
      style={{
        backgroundColor: 'tansparent',
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginVertical: 10,
        borderRadius: 10,
      }}
      multiline={multiline}
    />
  );
};

export default CustomTextInput;
