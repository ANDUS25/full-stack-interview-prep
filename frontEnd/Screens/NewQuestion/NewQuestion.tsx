import React, { useState } from 'react';
import { Text, View } from 'react-native';
import CustomButton from '../../component/CustomButton';
import CustomTextInput from '../../component/CustomTextInput';
import CustomLoader from '../../component/CustomLoader';
import { Color } from '../../utils/Colors';
import axios from 'axios';
import { BASE_URL } from '@env';
import { endPoint } from '../../utils/Title';

const NewQuestion = () => {
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);

  const postInfo = async () => {
    setIsDataLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/${endPoint.new_question}`, {
        question,
        answer,
      });
      console.log('res', res);
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsDataLoading(false);
    }
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

      {isDataLoading && <CustomLoader />}
    </View>
  );
};

export default NewQuestion;
