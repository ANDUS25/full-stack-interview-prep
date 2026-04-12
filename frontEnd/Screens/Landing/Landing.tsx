import { BASE_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import CustomAnimation from '../../component/CustomAnimation';
import CustomButton from '../../component/CustomButton';
import CustomLoader from '../../component/CustomLoader';
import { screenName } from '../../utils/Title';
import { SubjectDataInterface } from '../../utils/interface';

const Landing = () => {
  const navigation = useNavigation<any>();

  const [subjectData, setSubjectData] = useState<string[]>([]);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);

  const handleSubjectNavigation = (subjectName: string) => {
    navigation.navigate(screenName.SUBJECT, { subject: subjectName });
  };

  useEffect(() => {
    getSubjectData();
  }, []);

  const getSubjectData = async () => {
    setIsDataLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}`);

      if (res && res.status === 200 && res.data) {
        const getSubjectName = res?.data?.data?.map(
          (item: SubjectDataInterface) => item?.subject,
        );

        const subjectUniqueData = [...new Set(getSubjectName)];

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

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {isDataLoading ? (
          <CustomLoader />
        ) : (
          <FlatList
            ListEmptyComponent={
              <CustomAnimation
                path={require('../../assets/gif/No data Found.json')}
              />
            }
            data={subjectData}
            renderItem={({ item }) => {
              return (
                <CustomButton
                  name={item?.toUpperCase()}
                  onPress={() => handleSubjectNavigation(item)}
                />
              );
            }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  innerContainer: { marginHorizontal: 15 },
});

export default Landing;
