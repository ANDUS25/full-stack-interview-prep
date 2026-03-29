import { RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../../component/CustomButton';
import CustomTextInput from '../../component/CustomTextInput';
import axios from 'axios';

const data = [
  {
    id: 1,
    question: 'What is your name',
    answer: 'My Name is Anand Chavan',
  },
  {
    id: 2,
    question: 'How your are doing today?',
    answer: "I'm doing great today, What about you? How your are doing today?",
  },
];

const Subject = ({ route }: { route: RouteProp<any, any> }) => {
  const { params } = route;
  const { subject } = params || {};

  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [subjectData, setSubjectData] = useState<string>([]);

  const getSubjectData = async () => {
    try {
      const res = await axios.get(`http://10.0.2.2:8000/${subject}`);
      console.log('res', res);

      if (res && res.status === 200 && res.data) setSubjectData(res.data.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getSubjectData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.screenHeader}>
        Welcome to the {subject} Interview Preparation
      </Text>
      <CustomButton name="Add a New one" />

      <CustomTextInput
        placeHolder="Enter your question"
        onChange={setQuestion}
        value={question}
      />
      <CustomTextInput
        placeHolder="Enter your Answer"
        multiline={true}
        onChange={setAnswer}
        value={answer}
      />

      <View>
        <Text style={styles.listHeader}>Summery of Questions and Answers</Text>
        <FlatList
          data={subjectData}
          renderItem={({ index, item }) => (
            <View style={styles.listItem}>
              <View style={styles.listItemContent}>
                <Text>
                  {index + 1}. {item.question}
                </Text>
                <Text style={styles.listItemAnswer}>{item.answer}</Text>
              </View>
              <View style={styles.listItemActions}>
                <CustomButton name="Update" onPress={() => {}} />
                <CustomButton name="Delete" onPress={() => {}} />
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Subject;

const styles = StyleSheet.create({
  container: { flex: 1, marginHorizontal: 15 },
  listHeader: { fontWeight: 'bold', fontSize: 18, textAlign: 'center' },
  listItem: {
    marginVertical: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listItemContent: {
    flexDirection: 'column',
    width: '60%',
  },
  listItemAnswer: {
    paddingLeft: 15,
  },
  listItemActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  screenHeader: { fontSize: 20, textAlign: 'center', marginVertical: 20 },
});
