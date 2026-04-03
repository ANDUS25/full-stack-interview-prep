import { RouteProp } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CustomButton from '../../component/CustomButton';
import CustomTextInput from '../../component/CustomTextInput';
import CustomLoader from '../../component/CustomLoader';
import CustomAnimation from '../../component/CustomAnimation';
import { Color } from '../../utils/Colors';

const Subject = ({ route }: { route: RouteProp<any, any> }) => {
  const { params } = route;
  const { subject } = params || {};

  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [subjectData, setSubjectData] = useState<string>([]);
  const [fetchDataError, setFetchDataError] = useState<boolean>(false);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);

  const getSubjectData = async () => {
    setIsDataLoading(true);
    try {
      const res = await axios.get(`http://10.0.2.2:8000/${subject}`);
      console.log('res', res);

      if (res && res.status === 200 && res.data) setSubjectData(res.data.data);
      else {
        setFetchDataError(true);
        setIsDataLoading(false);
      }
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsDataLoading(false);
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

      {/* <CustomTextInput
        placeHolder="Enter your question"
        onChange={setQuestion}
        value={question}
      />
      <CustomTextInput
        placeHolder="Enter your Answer"
        multiline={true}
        onChange={setAnswer}
        value={answer}
      /> */}

      {fetchDataError ? (
        <View>
          <Text style={styles.listHeader}>
            Summery of Questions and Answers
          </Text>
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
      ) : (
        <View>
          <CustomAnimation
            path={require('../../assets/gif/No data Found.json')}
          />
        </View>
      )}

      {isDataLoading && <CustomLoader />}
    </View>
  );
};

export default Subject;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 15, backgroundColor: Color.White },
  listHeader: { fontWeight: 'bold', fontSize: 18, textAlign: 'center' },
  listItem: {
    marginVertical: 7,
    justifyContent: 'space-between',
  },
  listItemContent: {
    flexDirection: 'column',
    width: '100%',
  },
  listItemAnswer: {
    paddingLeft: 15,
    fontFamily: 'Nunito-ExtraLight',
  },
  listItemActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  screenHeader: { fontSize: 20, textAlign: 'center', marginVertical: 20 },
});
