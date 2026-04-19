import { StyleSheet } from 'react-native';
import { Color } from '../../utils/Colors';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Color.ThemeColor },
  innerContainer: {
    marginHorizontal: 15,
  },
  listHeader: {
    fontSize: 18,
    color: Color.White,
    textAlign: 'center',
    fontFamily: 'Nunito-Regular',
  },
  listItem: {
    marginVertical: 7,
    justifyContent: 'space-between',
  },
  innerInfoView: { flexDirection: 'row' },
  listItemContent: {
    flexDirection: 'column',
    width: '90%',
  },
  listItemAnswer: {
    paddingLeft: 10,
    color: Color.White,
    fontFamily: 'Nunito-ExtraBold',
    textAlign: 'justify',
  },
  listItemActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  screenHeader: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
    color: Color.White,
    fontFamily: 'Nunito-Regular',
  },
  scrollContainer: { marginBottom: 400 },
});

export default styles;
