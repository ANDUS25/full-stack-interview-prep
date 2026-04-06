import React, { FC } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import CustomButton from './CustomButton';

interface customModalProps {
  header: string;
  setVisible: () => void;
  visible: boolean;
}

const CustomModal: FC<customModalProps> = ({ ...props }) => {
  const { header, setVisible, visible } = props;

  return (
    <View style={styles.container}>
      <Modal visible={visible} animationType="slide" transparent={true}>
        <View style={styles.modal}>
          <View style={styles.content}>
            <Text style={styles.header}>{header}</Text>
            <CustomButton name="Close" onPress={setVisible} />
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
