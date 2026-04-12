import React, { FC } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { CustomModalProps } from '../utils/interface';
import CustomButton from './CustomButton';

const CustomModal: FC<CustomModalProps> = ({ ...props }) => {
  const {
    header,
    visible,
    onPressNo,
    onPressYes,
    onPress,
    showMultipleButtons = false,
    title = '',
  } = props;

  return (
    <View style={styles.container}>
      <Modal visible={visible} animationType="slide" transparent={true}>
        <View style={styles.modal}>
          <View style={styles.content}>
            <Text style={styles.header}>{header}</Text>
            {showMultipleButtons ? (
              <View style={styles.buttonView}>
                <CustomButton
                  name="No"
                  onPress={onPressNo || (() => {})}
                  style={styles.commonButtonView}
                />
                <CustomButton
                  name="Yes"
                  onPress={onPressYes || (() => {})}
                  style={styles.commonButtonView}
                />
              </View>
            ) : (
              <CustomButton name={title} onPress={onPress || (() => {})} />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(40, 38, 38, 0.9)',
  },
  content: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 15,
    borderRadius: 25,
    height: 150,
    justifyContent: 'space-between',
  },
  header: {
    textAlign: 'center',
    fontSize: 20,
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  commonButtonView: { width: '40%' },
});

export default CustomModal;
