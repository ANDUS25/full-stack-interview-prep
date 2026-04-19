import { BASE_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { StyleSheet, Text, ToastAndroid, View } from 'react-native';
import CustomButton from '../../component/CustomButton';
import CustomLoader from '../../component/CustomLoader';
import CustomModal from '../../component/CustomModal';
import CustomTextInput from '../../component/CustomTextInput';
import { Color } from '../../utils/Colors';
import { endPoint, screenName, string } from '../../utils/Title';

const NewQuestion = ({ ...props }) => {
  const { route } = props;
  const { subject } = route?.params || {};

  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  const navigation = useNavigation<any>();

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

      if (res && res.status === 201) {
        ToastAndroid.show(res?.data?.message, ToastAndroid.LONG);
        handleCloseModal();
      } else {
        ToastAndroid.show(res?.data?.message, ToastAndroid.LONG);
      }
    } catch (error) {
      console.log(string.ERROR_IN_POST_INFO_API, error);
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
    <View style={styles.container}>
      <Text style={styles.questionTextView}>{string.ADD_A_QUESTION}</Text>
      <View>
        <CustomTextInput
          placeHolder={string.ADD_QUESTION_HERE}
          value={question}
          multiline={true}
          onChange={setQuestion}
          style={styles.commonFontFamily}
        />
        <CustomTextInput
          placeHolder={string.ADD_ANSWER_HERE}
          value={answer}
          multiline={true}
          onChange={setAnswer}
          style={styles.commonFontFamily}
        />
        <CustomTextInput
          placeHolder={string.Add_Extra_Notes_here}
          value={note}
          multiline={true}
          onChange={setNote}
          style={styles.commonFontFamily}
        />

        <CustomButton name={string.SUBMIT} onPress={showConfirmation} />
      </View>
      {visible && (
        <CustomModal
          header={string.SURE_WANT_TO_SUBMIT_QUESTION}
          visible={visible}
          onPressYes={postInfo}
          onPressNo={() => setVisible(false)}
          title={string.OKAY}
          showMultipleButtons={true}
        />
      )}

      {isDataLoading && <CustomLoader />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: Color.ThemeColor,
  },
  questionTextView: { textAlign: 'center', fontSize: 20 },
  commonFontFamily: {
    fontFamily: 'Nunito-Regular',
    color: Color.White,
    backgroundColor: Color.ThemeBackgroundColor,
  },
});

export default NewQuestion;
