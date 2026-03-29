import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import CustomButton from '../../component/CustomButton';
import { screeName, subject } from '../../utils/Title';

const Landing = () => {
  const navigation = useNavigation<any>();

  const handleSubjectNavigation = (subjectName: string) => {
    navigation.navigate(screeName.SUBJECT, { subject: subjectName });
  };

  return (
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: { marginHorizontal: 15 },
});

export default Landing;
