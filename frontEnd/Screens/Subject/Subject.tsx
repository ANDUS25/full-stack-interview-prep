import { BASE_URL } from '@env';
import { RouteProp, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
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
import { CommonStrings } from '../../utils/Enum';
import {
  DeleteModalInterface,
  SubjectDataInterface,
  SubjectRenderItemInterface,
} from '../../utils/Interface';
import { screenName, string } from '../../utils/Title';
import styles from './Styles';

const Subject = ({ route }: { route: RouteProp<any, any> }) => {
  const { params } = route;
  const { subject } = params || {};

  console.log('CommonStrings', subject.split(' '));

  const [subjectData, setSubjectData] = useState<SubjectDataInterface[]>([]);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [pullToRefreshLoading, setPullToRefreshLoading] =
    useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] =
    useState<DeleteModalInterface>({ data: '', value: false });

  const navigation = useNavigation<any>();

  const { height } = Dimensions.get('window');

  const getSubjectData = useCallback(async () => {
    setIsDataLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}${subject.toLowerCase()}`);
      console.log('res', res);

      if (res && res.status === 200 && res.data) setSubjectData(res.data.data);
      else {
        setSubjectData([]);
        setIsDataLoading(false);
        navigation.navigate(screenName.HOME);
      }
    } catch (error) {
      setIsDataLoading(false);
      navigation.navigate(screenName.HOME);
      console.log('Error from getSubjectData', error);
    } finally {
      setIsDataLoading(false);
    }
  }, [navigation, subject]);

  useEffect(() => {
    getSubjectData();
  }, [deleteModalVisible, getSubjectData]);

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
      // console.log('handleDeleteItem Res', res);

      if (res && res.data.data && res.data.responseCode === 201) {
        setDeleteModalVisible({ data: '', value: false });
        pullToRefresh();
        ToastAndroid.show(res?.data?.message, ToastAndroid.LONG);
      } else {
        console.log('Failed to delete question');
        ToastAndroid.show(string.FAILED_TO_DELETE_QUESTION, ToastAndroid.SHORT);
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

  const makeFunLetterCapital = (text: string) => {
    const textInUpperCase = text
      .split(' ')
      .map(item => item.charAt(0).toUpperCase() + item.slice(1))
      .join(' ');

    return textInUpperCase;
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
          <CustomButton
            name={string.UPDATE}
            onPress={() => updateQuestion(item)}
          />
          <CustomButton
            name={string.DELETE}
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
          {string.WELCOME.replace(
            `${CommonStrings.SUBJECT}`,
            `${makeFunLetterCapital(subject)}`,
          )}
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
              {string.SUMMERY_OF_QUESTIONS_AND_ANSWERS}
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
              keyExtractor={(item, index) => item.question + index}
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
