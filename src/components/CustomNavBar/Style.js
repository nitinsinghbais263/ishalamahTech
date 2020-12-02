import { StyleSheet} from 'react-native';
import { getAdjustedFontSize } from '../../Responsive/fontResponsive.js';

export default StyleSheet.create({
  container: {
  	// height: 50,
  	backgroundColor: '#23bde4',
  	justifyContent: 'space-between',
  	flexDirection: 'row'
  },
  imageView:{
  	justifyContent: 'center',
  	marginLeft: 10,
  	marginVertical: 15
  },
  image:{
  	transform: [{ rotate: '180deg' }]
  },
  imageAR:{
  },
  textView:{
  	justifyContent: 'center',
  	marginRight: 10,
  	marginVertical: 15,
    flexDirection: 'row'
  },
  text:{
  	fontSize: getAdjustedFontSize(20),
  	color: '#ffffff'
  }
})