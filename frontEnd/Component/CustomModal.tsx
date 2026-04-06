import React, { FC } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import CustomButton from './CustomButton';

interface customModalProps {
  header: string;
  visible: boolean;
  onPressNo?: () => void;
  onPressYes?: () => void;
  onPress?: () => void;
  showMultipleButtons: boolean;
  title?: string;
}

const CustomModal: FC<customModalProps> = ({ ...props }) => {
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
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  width: '100%',
                }}
              >
                <CustomButton
                  name="No"
                  onPress={onPressNo || (() => {})}
                  style={{ width: '50%' }}
                />
                <CustomButton
                  name="Yes"
                  onPress={onPressYes || (() => {})}
                  style={{ width: '50%' }}
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
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  modal: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(40, 38, 38, 0.9)',
  },
  content: {
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    textAlign: 'center',
    fontSize: 20,
  },
});

export default CustomModal;
