import { RouteProp, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, RefreshControl } from 'react-native';
import CustomAnimation from '../../component/CustomAnimation';
import CustomButton from '../../component/CustomButton';
import CustomLoader from '../../component/CustomLoader';
import { Color } from '../../utils/Colors';
import { screenName } from '../../utils/Title';
import { BASE_URL } from '@env';
import CustomModal from '../../component/CustomModal';

const Subject = ({ route }: { route: RouteProp<any, any> }) => {
  const { params } = route;
  const { subject } = params || {};

  const [subjectData, setSubjectData] = useState<any[]>([]);
  const [fetchDataError, setFetchDataError] = useState<boolean>(false);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [pullToRefreshLoading, setPullToRefreshLoading] =
    useState<boolean>(false);

  const navigation = useNavigation();

  console.log('subjectData', subjectData);
  useEffect(() => {
    console.log('BASE_URL', BASE_URL);
    getSubjectData();
  }, []);

  const getSubjectData = async () => {
    setIsDataLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}${subject}`);
      console.log('res', res);

      if (res && res.status === 200 && res.data) setSubjectData(res.data.data);
      else {
        setSubjectData([]);
        setFetchDataError(true);
        setIsDataLoading(false);
      }
    } catch (error) {
      console.log('Error from getSubjectData', error);
    } finally {
      setIsDataLoading(false);
    }
  };

  const navigateToNewQuestionScreen = () => {
    navigation.navigate(screenName.NEW_QUESTION, { subject: subject });
  };

  const pullToRefresh = async () => {
    setPullToRefreshLoading(true);
    await getSubjectData();
    setPullToRefreshLoading(false);
  };

  const handleDeleteItem = async (id: string) => {
    try {
      const res = await axios.delete(`${BASE_URL}${subject}/${id}`);
      console.log('handleDeleteItem Res', res);
    } catch (error) {
      console.log('Error from handleDeleteItem', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenHeader}>
        Welcome to the {subject} Interview Preparation
      </Text>
      <CustomButton
        name="Add a New one"
        onPress={navigateToNewQuestionScreen}
      />

      {!fetchDataError && !isDataLoading && subjectData.length > 0 ? (
        <View>
          <Text style={styles.listHeader}>
            Summery of Questions and Answers
          </Text>
          <FlatList
            data={subjectData}
            refreshControl={
              <RefreshControl
                refreshing={pullToRefreshLoading}
                onRefresh={pullToRefresh}
              />
            }
            keyExtractor={(item, index) => index.toString()}
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
                  <CustomButton
                    name="Delete"
                    onPress={() => handleDeleteItem(item._id)}
                  />
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

      <CustomModal header="Are you sure ?" visible={true} setVisible={} />

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
