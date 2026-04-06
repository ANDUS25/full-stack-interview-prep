import { BASE_URL } from '@env';
import axios from 'axios';
import React, { useState } from 'react';
import { ToastAndroid, View } from 'react-native';
import CustomButton from '../../component/CustomButton';
import CustomLoader from '../../component/CustomLoader';
import CustomModal from '../../component/CustomModal';
import CustomTextInput from '../../component/CustomTextInput';
import { screenName } from '../../utils/Title';
import { useNavigation } from '@react-navigation/native';

const UpdateQuestion = ({ ...props }) => {
  const { subject, item } = props?.route?.params || {};
  console.log('item', item);

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

  const navigation = useNavigation();

  const showConfirmationModal = () => {
    setShowModal(true);
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

      console.log('Res of handleUpdateItem', res);
    } catch (error) {
      setIsDataLoading(false);
      console.log('Error from handleUpdateItem', error);
    } finally {
      setIsDataLoading(false);
    }
  };

  return (
    <View>
      <CustomTextInput
        placeHolder="Add question here"
        value={question}
        multiline={true}
        onChange={setQuestion}
      />
      <CustomTextInput
        placeHolder="Add answer here"
        value={answer}
        multiline={true}
        onChange={setAnswer}
      />
      <CustomTextInput
        placeHolder="Add Extra Notes here"
        value={note}
        multiline={true}
        onChange={setNote}
      />

      <CustomButton name="Update" onPress={showConfirmationModal} />

      <CustomModal
        header="Are you sure want to update ?"
        visible={showModel}
        onPressNo={() => setShowModal(false)}
        onPressYes={() => handleUpdateItem()}
        showMultipleButtons={true}
      />
      {isDataLoading && <CustomLoader />}
    </View>
  );
};

export default UpdateQuestion;
