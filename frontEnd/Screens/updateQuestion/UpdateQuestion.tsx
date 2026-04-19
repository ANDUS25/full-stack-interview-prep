import { BASE_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastAndroid, View, StyleSheet } from 'react-native';
import CustomButton from '../../component/CustomButton';
import CustomLoader from '../../component/CustomLoader';
import CustomModal from '../../component/CustomModal';
import CustomTextInput from '../../component/CustomTextInput';
import { Color } from '../../utils/Colors';
import { screenName, string } from '../../utils/Title';
import { CommonStrings, StringReplace } from '../../utils/Enum';

const UpdateQuestion = ({ ...props }) => {
  const { subject, item, isComingFrom } = props?.route?.params || {};

  const {
    note: noteValue,
    answer: answerValue,
    question: questionValue,
  } = item || {};

  const [question, setQuestion] = useState<string>(questionValue || '');
  const [answer, setAnswer] = useState<string>(answerValue || '');
  const [note, setNote] = useState<string>(noteValue || '');
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [showModel, setShowModal] = useState<boolean>(false);
  const [newSubject, setNewSubject] = useState<string>(subject || '');

  const navigation = useNavigation();

  const isComingFromHome = (): boolean => {
    return isComingFrom === screenName.HOME;
  };

  useEffect(() => {
    navigation.setOptions({
      title: isComingFromHome()
        ? screenName.ADD_SUBJECT
        : screenName.UPDATE_QUESTION,
    });
  }, []);

  const showConfirmationModal = () => {
    setShowModal(true);
  };

  const addNewSubjectWithInfo = async () => {
    setIsDataLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}addNewSubject`, {
        subject: newSubject,
        question,
        answer,
        note,
      });

      if (res?.data?.responseCode === 201 && res?.data?.status === 'success') {
        setShowModal(false);
        ToastAndroid.show(res?.data?.message, ToastAndroid.LONG);
        navigation.navigate(screenName.HOME);
      }
      // console.log('res from addNewSubjectWithInfo', await res);
    } catch (error) {
      setIsDataLoading(false);
      console.log('Error from addNewSubjectWithInfo', error);
    } finally {
      setIsDataLoading(false);
    }
  };

  const handleUpdateItem = async () => {
    setIsDataLoading(true);
    try {
      const res = await axios.patch(`${BASE_URL}${subject}/${item._id}`, {
        subject,
        question,
        note,
        answer,
      });

      if (
        res &&
        res.data?.responseCode === 200 &&
        res?.data?.status === 'success'
      ) {
        setShowModal(false);
        ToastAndroid.show(res?.data?.message, ToastAndroid.LONG);
        navigation.navigate(screenName.SUBJECT, { subject: subject });
      }

      // console.log('Res of handleUpdateItem', res);
    } catch (error) {
      setIsDataLoading(false);
      console.log('Error from handleUpdateItem', error);
    } finally {
      setIsDataLoading(false);
    }
  };

  const handleFunction = () => {
    isComingFromHome() ? addNewSubjectWithInfo() : handleUpdateItem();
  };

  return (
    <View style={styles.container}>
      <View style={styles.ParentView}>
        {isComingFromHome() && (
          <CustomTextInput
            placeHolder={string.ADD_Data_HERE.replace(
              StringReplace.DATA,
              StringReplace.SUBJECT,
            )}
            value={newSubject}
            multiline={true}
            onChange={setNewSubject}
          />
        )}

        <CustomTextInput
          placeHolder={string.ADD_Data_HERE.replace(
            StringReplace.DATA,
            StringReplace.QUESTION,
          )}
          value={question}
          multiline={true}
          onChange={setQuestion}
        />

        <CustomTextInput
          placeHolder={string.ADD_Data_HERE.replace(
            StringReplace.DATA,
            StringReplace.ANSWER,
          )}
          value={answer}
          multiline={true}
          onChange={setAnswer}
        />

        <CustomTextInput
          placeHolder={string.ADD_Data_HERE.replace(
            StringReplace.DATA,
            StringReplace.EXTRA_NOTES,
          )}
          value={note}
          multiline={true}
          onChange={setNote}
        />

        <CustomButton
          name={
            isComingFromHome()
              ? CommonStrings.ADD_SUBJECT
              : CommonStrings.UPDATE
          }
          onPress={showConfirmationModal}
        />

        <CustomModal
          header={
            isComingFromHome()
              ? string.ARE_YOU_SURE_WANT_TO_ADD_SUBJECT
              : string.ARE_YOU_SURE_WANT_TO_UPDATE
          }
          visible={showModel}
          onPressNo={() => setShowModal(false)}
          onPressYes={handleFunction}
          showMultipleButtons={true}
        />
        {isDataLoading && <CustomLoader />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Color.White },
  ParentView: { marginHorizontal: 15 },
});

export default UpdateQuestion;
