import { BASE_URL } from '@env';
import axios from 'axios';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import CustomButton from '../../component/CustomButton';
import CustomLoader from '../../component/CustomLoader';
import CustomModal from '../../component/CustomModal';
import CustomTextInput from '../../component/CustomTextInput';
import { Color } from '../../utils/Colors';
import { endPoint, screenName } from '../../utils/Title';
import { useNavigation } from '@react-navigation/native';

const NewQuestion = ({ ...props }) => {
  const { route } = props;
  const { subject } = route?.params || {};

  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
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
      });
      console.log('res', res);

      if (res && res.status === 201) {
        setVisible(true);
      } else {
        // Handle unsuccessful submission
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

        <CustomButton name="Submit" onPress={postInfo} />
      </View>
      {visible && (
        <CustomModal
          header="Question Submitted!"
          visible={visible}
          setVisible={handleCloseModal}
        />
      )}
      {isDataLoading && <CustomLoader />}
    </View>
  );
};

export default NewQuestion;
