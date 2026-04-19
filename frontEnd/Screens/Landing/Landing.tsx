import { BASE_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  Dimensions,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import CustomAnimation from '../../component/CustomAnimation';
import CustomButton from '../../component/CustomButton';
import CustomLoader from '../../component/CustomLoader';
import CustomModal from '../../component/CustomModal';
import { screenName, string } from '../../utils/Title';
import { SubjectDataInterface } from '../../utils/Interface';

const { width } = Dimensions.get('window');

const Landing = () => {
  const navigation = useNavigation<any>();

  const [subjectData, setSubjectData] = useState<string[]>([]);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [showBackConfirmationModal, setShowBackConfirmationModal] =
    useState<boolean>(false);

  const handleSubjectNavigation = (subjectName: string) => {
    navigation.navigate(screenName.SUBJECT, { subject: subjectName });
  };

  // Get Subject-wise Data
  useEffect(() => {
    getSubjectData();
  }, []);

  // Back Button Handler
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        showConfirmationModal();
        return true;
      },
    );

    return () => backHandler.remove();
  }, []);

  // call subject data API
  const getSubjectData = async () => {
    setIsDataLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}`);

      if (res && res.status === 200 && res.data) {
        const getSubjectName = res?.data?.data?.map(
          (item: SubjectDataInterface) => item?.subject,
        );

        const subjectUniqueData: string[] = [
          ...new Set(getSubjectName),
        ] as string[];

        setSubjectData(subjectUniqueData);
      } else {
        setSubjectData([]);
        setIsDataLoading(false);
      }
    } catch (error) {
      console.log('Error from getSubjectData', error);
    } finally {
      setIsDataLoading(false);
    }
  };

  // show confirmation modal when user click on back button
  const showConfirmationModal = () => {
    setShowBackConfirmationModal(true);
  };

  const navigateToAddSubjectScreen = () => {
    navigation.navigate(screenName.UPDATE_QUESTION, {
      isComingFrom: screenName.HOME,
    });
  };

  const renderItem = ({ item }: { item: string }) => {
    return (
      <CustomButton
        name={item?.toUpperCase()}
        onPress={() => handleSubjectNavigation(item)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {isDataLoading ? (
          <View style={styles.getLoaderContainer}>
            <CustomLoader />
          </View>
        ) : (
          <View>
            <FlatList
              ListEmptyComponent={
                <CustomAnimation
                  path={require('../../assets/gif/No data Found.json')}
                />
              }
              keyExtractor={item => item + item}
              data={subjectData}
              renderItem={renderItem}
            />
          </View>
        )}
      </View>
      <View style={styles.subjectButtonContainer}>
        <CustomButton
          name={string.ADD_NEW_SUBJECT}
          onPress={() => navigateToAddSubjectScreen()}
        />
      </View>

      <CustomModal
        header={string.EXIT_THE_APP}
        visible={showBackConfirmationModal}
        onPressNo={() => setShowBackConfirmationModal(false)}
        onPressYes={() => BackHandler.exitApp()}
        showMultipleButtons={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  innerContainer: { marginHorizontal: 15 },
  getLoaderContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subjectButtonContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: width / 2 - (width * 0.3) / 2,
  },
});

export default Landing;
