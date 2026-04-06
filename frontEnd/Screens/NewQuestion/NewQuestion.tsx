import { BASE_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { Text, ToastAndroid, View } from 'react-native';
import CustomButton from '../../component/CustomButton';
import CustomLoader from '../../component/CustomLoader';
import CustomModal from '../../component/CustomModal';
import CustomTextInput from '../../component/CustomTextInput';
import { Color } from '../../utils/Colors';
import { endPoint, screenName } from '../../utils/Title';

const NewQuestion = ({ ...props }) => {
  const { route } = props;
  const { subject } = route?.params || {};

  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  const navigation = useNavigation();

  const postInfo = async () => {
    setIsDataLoading(true);
    try {
      setIsDataLoading(false);
      const res = await axios.post(`${BASE_URL}${endPoint.new_question}`, {
        subject,
        question,
        answer,
        note,
      });
      console.log('Res from postInfo', res);

      if (res && res.status === 201) {
        ToastAndroid.show(res?.data?.message, ToastAndroid.LONG);
        handleCloseModal();
      } else {
        ToastAndroid.show(res?.data?.message, ToastAndroid.LONG);
      }
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsDataLoading(false);
    }
  };

  const handleCloseModal = () => {
    setVisible(false);
    setQuestion('');
    setAnswer('');
    navigation.navigate(screenName.HOME);
  };

  const showConfirmation = () => {
    setVisible(true);
  };

  return (
    <View
      style={{ flex: 1, paddingHorizontal: 15, backgroundColor: Color.White }}
    >
      <Text style={{ textAlign: 'center', fontSize: 20 }}>Add a question</Text>
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

        <CustomButton name="Submit" onPress={showConfirmation} />
      </View>
      {visible && (
        <CustomModal
          header="Sure Want to Submit Question?"
          visible={visible}
          onPressYes={postInfo}
          onPressNo={() => setVisible(false)}
          title={'Okay'}
          showMultipleButtons={true}
        />
      )}

      {isDataLoading && <CustomLoader />}
    </View>
  );
};

export default NewQuestion;
