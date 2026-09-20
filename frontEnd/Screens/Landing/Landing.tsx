import { BASE_URL } from '@env';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import {
  BackHandler,
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import CustomAnimation from '../../component/CustomAnimation';
import CustomButton from '../../component/CustomButton';
import CustomLoader from '../../component/CustomLoader';
import CustomModal from '../../component/CustomModal';
import { Color } from '../../utils/Colors';
import { SubjectDataInterface } from '../../utils/Interface';
import { screenName, string } from '../../utils/Title';

const { width } = Dimensions.get('window');

const Landing = () => {
  const navigation = useNavigation<any>();

  const [subjectData, setSubjectData] = useState<string[]>([]);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [showBackConfirmationModal, setShowBackConfirmationModal] =
    useState<boolean>(false);

  const handleSubjectNavigation = (subjectName: string) => {
    navigation.navigate(screenName.SUBJECT, { subject: subjectName });
  };

  // Get Subject-wise Data
  useEffect(() => {
    getSubjectData();
  }, []);

  // Show confirmation modal when user clicks back button
  const showConfirmationModal = useCallback(() => {
    setShowBackConfirmationModal(true);
  }, []);

  // Hardware back button handler for Android (active only when Home is focused)
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        showConfirmationModal();
        return true;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => subscription.remove();
    }, [showConfirmationModal]),
  );

  // Intercept header back button or swipe-back on Home screen
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e: any) => {
      if (e.data.action.type === 'NAVIGATE' || e.data.action.type === 'PUSH') {
        return;
      }
      e.preventDefault();
      showConfirmationModal();
    });

    return unsubscribe;
  }, [navigation, showConfirmationModal]);

  // call subject data API
  const getSubjectData = async (isRefresh = false) => {
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setIsDataLoading(true);
    }
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
      }
    } catch (error) {
      console.log('Error from getSubjectData', error);
    } finally {
      setIsDataLoading(false);
      setIsRefreshing(false);
    }
  };

  const onRefresh = () => {
    getSubjectData(true);
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
          <View style={styles.flatListContainer}>
            <FlatList
              ListEmptyComponent={
                <CustomAnimation
                  path={require('../../assets/gif/No data Found.json')}
                />
              }
              keyExtractor={item => item}
              data={subjectData}
              renderItem={renderItem}
              contentContainerStyle={styles.flatListContent}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={onRefresh}
                  colors={[Color.ThemeBackgroundColor, Color.White]}
                  tintColor={Color.White}
                />
              }
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
  container: { flex: 1, backgroundColor: Color.Black },
  innerContainer: { flex: 1, marginHorizontal: 15 },
  flatListContainer: { flex: 1 },
  flatListContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
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
