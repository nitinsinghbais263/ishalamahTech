import { StyleSheet, Dimensions, Platform} from 'react-native';
import { getAdjustedFontSize } from '../../Responsive/fontResponsive.js';

const sysWidth = Dimensions.get('window').width;
const sysHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
     width: '100%',
     height: '100%',
  	 backgroundColor: '#ffffff'
  },
  header:{
    paddingHorizontal:10,
  	backgroundColor:'#23BDE4',
  	justifyContent: 'center',
  	width: '100%',
  	height: 60
  },
  reasonView:{
    marginTop: 30,
    paddingLeft: 10
  },
  reasonText:{
    color: '#6C6C6C',
    fontSize: getAdjustedFontSize(20)
  },
  reasonDescView:{
    padding: 10
  },
  reasonDescText:{
    color: '#6C6C6C',
    fontSize: getAdjustedFontSize(18)
  },
  inputFieldView:{
    marginTop: 20
  },
  contentInput: {
    backgroundColor: '#F8F8F8',
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10,
    fontSize: getAdjustedFontSize(15)
  },
  placeholdersStyle:{
    fontStyle: 'italic',
    fontSize: getAdjustedFontSize(15)
  },
  buttonViewBG:{
    height: 50,
    width: '100%',
    backgroundColor: '#23BDE4'
  },
  buttonView:{
    height: 50,
    width: '100%',
    backgroundColor: '#23BDE4',
    justifyContent: 'center'
  },
  buttonText:{
    fontSize: getAdjustedFontSize(22),
    color: '#ffffff',
    alignSelf: 'center',
    fontWeight: 'bold'
  }
})
