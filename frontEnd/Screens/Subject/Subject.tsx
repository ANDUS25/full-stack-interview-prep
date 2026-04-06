import { BASE_URL } from '@env';
import { RouteProp, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import CustomAnimation from '../../component/CustomAnimation';
import CustomButton from '../../component/CustomButton';
import CustomLoader from '../../component/CustomLoader';
import CustomModal from '../../component/CustomModal';
import { Color } from '../../utils/Colors';
import { screenName, string } from '../../utils/Title';

const Subject = ({ route }: { route: RouteProp<any, any> }) => {
  const { params } = route;
  const { subject } = params || {};

  const [subjectData, setSubjectData] = useState<any[]>([]);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [pullToRefreshLoading, setPullToRefreshLoading] =
    useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState<{
    data: string;
    value: boolean;
  }>({
    data: '',
    value: false,
  });

  const navigation = useNavigation();

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
    console.log('${BASE_URL}${subject}/${id}', `${BASE_URL}${subject}/${id}`);

    try {
      const res = await axios.delete(`${BASE_URL}${subject}/${id}`);
      console.log('handleDeleteItem Res', res);

      if (res && res.data.data && res.data.responseCode === 201) {
        setDeleteModalVisible({ data: '', value: false });
        pullToRefresh();
        ToastAndroid.show(res?.data?.message, ToastAndroid.LONG);
      } else {
        console.log('Failed to delete question');
        ToastAndroid.show('Failed to delete question', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log('Error from handleDeleteItem', error);
    }
  };

  const hideDeleteModal = () => {
    setDeleteModalVisible({ data: '', value: false });
  };

  const updateQuestion = item => {
    navigation.navigate(screenName.UPDATE_QUESTION, { subject: subject, item });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenHeader}>
        {string.WELCOME.replace('subject', subject)}
      </Text>
      <CustomButton
        name={string.ADD_A_NEW_ONE}
        onPress={navigateToNewQuestionScreen}
      />

      {subjectData.length > 0 ? (
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
            keyExtractor={item => item.question}
            renderItem={({ index, item }) => (
              <View style={styles.listItem}>
                <View style={styles.listItemContent}>
                  <Text>
                    {index + 1}. Question:- {item.question}
                  </Text>
                  <Text style={styles.listItemAnswer}>
                    Answer :- {item.answer}
                  </Text>
                  <Text style={styles.listItemAnswer}>
                    Extra :- {item.note}
                  </Text>
                </View>
                <View style={styles.listItemActions}>
                  <CustomButton
                    name="Update"
                    onPress={() => updateQuestion(item)}
                  />
                  <CustomButton
                    name="Delete"
                    onPress={() =>
                      setDeleteModalVisible({ data: item._id, value: true })
                    }
                  />
                </View>
              </View>
            )}
          />
        </View>
      ) : (
        !isDataLoading && (
          <View>
            <CustomAnimation
              path={require('../../assets/gif/No data Found.json')}
            />
          </View>
        )
      )}

      <CustomModal
        header="Are you sure want to delete ?"
        visible={deleteModalVisible.value}
        onPressNo={hideDeleteModal}
        onPressYes={() => handleDeleteItem(deleteModalVisible.data)}
        showMultipleButtons={true}
      />

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
    fontFamily: 'Nunito-ExtraBold',
  },
  listItemActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  screenHeader: { fontSize: 20, textAlign: 'center', marginVertical: 20 },
});
