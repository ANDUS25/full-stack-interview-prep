import { BASE_URL } from '@env';
import { RouteProp, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  RefreshControl,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import CustomAnimation from '../../component/CustomAnimation';
import CustomButton from '../../component/CustomButton';
import CustomLoader from '../../component/CustomLoader';
import CustomModal from '../../component/CustomModal';
import { screenName, string } from '../../utils/Title';
import {
  DeleteModalInterface,
  SubjectDataInterface,
  SubjectRenderItemInterface,
} from '../../utils/interface';
import styles from './Styles';

const Subject = ({ route }: { route: RouteProp<any, any> }) => {
  const { params } = route;
  const { subject } = params || {};

  const [subjectData, setSubjectData] = useState<SubjectDataInterface[]>([]);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [pullToRefreshLoading, setPullToRefreshLoading] =
    useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] =
    useState<DeleteModalInterface>({
      data: '',
      value: false,
    });

  const navigation = useNavigation();
  const { height } = Dimensions.get('window');

  useEffect(() => {
    getSubjectData();
  }, [subject]);

  const getSubjectData = async () => {
    setIsDataLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}${subject.toLowerCase()}`);
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

  const updateQuestion = (item: SubjectDataInterface) => {
    navigation.navigate(screenName.UPDATE_QUESTION, { subject: subject, item });
  };

  const renderItem = ({ index, item }: SubjectRenderItemInterface) => {
    return (
      <View style={styles.listItem}>
        <View style={styles.innerInfoView}>
          <Text style={styles.listItemAnswer}>{index + 1}.</Text>
          <View style={styles.listItemContent}>
            <Text style={styles.listItemAnswer}>
              {string.QUESTION}:- {item.question}
            </Text>
            <Text style={styles.listItemAnswer}>
              {string.ANSWER} :- {item.answer}
            </Text>
            <Text style={styles.listItemAnswer}>
              {string.NOTE} :- {item.note}
            </Text>
          </View>
        </View>
        <View style={styles.listItemActions}>
          <CustomButton name="Update" onPress={() => updateQuestion(item)} />
          <CustomButton
            name="Delete"
            onPress={() =>
              setDeleteModalVisible({ data: item._id, value: true })
            }
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.screenHeader}>
          {string.WELCOME.replace('subject', subject)}
        </Text>

        <CustomButton
          name={string.ADD_A_NEW_ONE}
          onPress={navigateToNewQuestionScreen}
        />

        {isDataLoading ? (
          <View style={{ height: height / 2 }}>
            <CustomLoader />
          </View>
        ) : (
          <View style={styles.scrollContainer}>
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
              scrollEnabled={true}
              keyExtractor={item => item.question}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <CustomAnimation
                  path={require('../../assets/gif/No data Found.json')}
                />
              }
            />
          </View>
        )}

        <CustomModal
          header={string.ARE_YOU_SURE_WANT_TO_DELETE}
          visible={deleteModalVisible.value}
          onPressNo={hideDeleteModal}
          onPressYes={() => handleDeleteItem(deleteModalVisible.data)}
          showMultipleButtons={true}
        />
      </View>
    </View>
  );
};

export default Subject;
