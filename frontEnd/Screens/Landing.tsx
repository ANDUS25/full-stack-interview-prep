import React from 'react';
import { View } from 'react-native';
import CustomButton from '../Component/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { screeName, subject } from '../Utils/Title';

const Landing = () => {
  const navigation = useNavigation<any>();

  const handleSubjectNavigation = (subjectName: string) => {
    navigation.navigate(screeName.SUBJECT, { subject: subjectName });
  };
  
  return (
    <View style={{ marginHorizontal: 15 }}>
      <CustomButton
        name="React"
        onPress={() => handleSubjectNavigation(subject.REACT)}
      />
      <CustomButton
        name="React Native"
        onPress={() => handleSubjectNavigation(subject.REACT_NATIVE)}
      />
      <CustomButton
        name="System Design"
        onPress={() => handleSubjectNavigation(subject.SYSTEM_DESIGN)}
      />
      <CustomButton
        name="Javascript"
        onPress={() => handleSubjectNavigation(subject.JAVASCRIPT)}
      />
      <CustomButton
        name="Node"
        onPress={() => handleSubjectNavigation(subject.NODE)}
      />
      <CustomButton
        name="Express.js"
        onPress={() => handleSubjectNavigation(subject.EXPRESS_JS)}
      />
    </View>
  );
};

export default Landing;
