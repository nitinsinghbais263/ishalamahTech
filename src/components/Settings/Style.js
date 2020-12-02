import { StyleSheet, Dimensions, Platform} from 'react-native';
import { getAdjustedFontSize } from '../../Responsive/fontResponsive.js';

const sysWidth = Dimensions.get('window').width;
const sysHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
  	flex: 1,
  	backgroundColor: '#ffffff'
  },
  header:{
  	position: 'relative',
  	backgroundColor:'#23BDE4',
  	top: 0,
  	width: '100%',
  	height: 60,
  	justifyContent: 'center'
  },
  languageView:{
  	marginTop: 30,
  	paddingLeft: 10,
    flexDirection: 'row',
  },
  languageText:{
  	color: '#6C6C6C',
  	fontSize: getAdjustedFontSize(20)
  },
  languageSelectView:{
  	marginTop: 20,
  	backgroundColor: '#F8F8F8',
  	height: 50
  },
  acceptTitleView:{
  	marginTop: 20,
  	paddingLeft: 10,
    flexDirection: 'row',
  },
  acceptTitle:{
  	color: '#6C6C6C',
  	fontSize: getAdjustedFontSize(20)
  },
  acceptSelectView:{
  	marginTop: 20,
  	backgroundColor: '#F8F8F8',
  	height: 50
  }
})
