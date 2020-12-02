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
  	height: 60
  },
  textView:{
    width: '100%',
    height: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  heading:{
    color: '#6C6C6C',
    fontSize: getAdjustedFontSize(30),
    fontWeight: '600',
    alignSelf: 'center',
    marginBottom: 20
  },
  message:{
    color: '#6C6C6C',
    fontSize: getAdjustedFontSize(18),
    alignSelf: 'center',
    textAlign: 'center'
  },
  buttonBG:{
    position: 'absolute',
    bottom: 0,
    height: 50,
    width: '100%',
    backgroundColor: '#23BDE4',
  },
  button:{
    height: 50,
    backgroundColor: '#23BDE4',
    width: '100%',
    justifyContent: 'center'
  },
  buttonText:{
    alignSelf: 'center',
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: getAdjustedFontSize(22)
  }
})
