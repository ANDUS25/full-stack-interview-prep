import { StyleSheet } from 'react-native';
import { Color } from '../../utils/Colors';

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.ThemeColor,
  },
  lottie: { width: 350, height: 350 },
});

export default style;
