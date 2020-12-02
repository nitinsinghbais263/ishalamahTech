import { getAdjustedFontSize } from '../../Responsive/fontResponsive.js';
import { StyleSheet, Dimensions, Platform} from 'react-native';

export default StyleSheet.create({
  container: {
  	flex: 1,
  	backgroundColor: '#ffffff'
  },
  topView:{
  },
  bottomView:{
    backgroundColor: '#ffffff'
  },
  autoView:{

  },
  autoTitle:{
  	padding: 10,
  	marginTop: 15
  },
  autoText:{
  	fontSize: getAdjustedFontSize(20),
  	color: '#6C6C6C'
  },
  autoInputView:{
  	marginTop: 15
  },
  autoInput:{
  	backgroundColor: "#F8F8F8",
  	padding: 10,
  	justifyContent: 'center',
  	height: 50,
  	width: "100%"
  },
  smokeView:{
    marginTop: 10
  },
  heatView:{
    marginTop: 10
  },
  alarmView:{
    marginTop: 10,
    marginBottom: 20
  },
  picker:{
  	height: 50, 
  	width: '100%',
    backgroundColor: 'transparent',
    justifyContent:'center',
    color: '#000000'
  },
  pickerView:{
  	backgroundColor: '#f8f8f8',
  	marginTop: 10,
    height: 50,
    justifyContent: 'center',
    paddingLeft: Platform.OS === 'ios' ? 10 : 0
  },
  pickerViewAR:{
    backgroundColor: '#f8f8f8',
    marginTop: 10,
    height: 50,
    justifyContent: 'center',
    paddingRight: Platform.OS === 'ios' ? 10 : 0
  },
  dropdownImage:{
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
    // alignSelf: 'center'
  },
  dropdownArrowView:{
  	position: 'absolute', 
    right: 10,
    width: 10, 
    height: 10,
    top: Platform.OS !== 'ios' ? 22 : 2
  },
  dropdownArrowViewAR:{
  	position: 'absolute', 
    left: Platform.OS === 'ios' ? (-(Dimensions.get('window').width - 20)) : (-(Dimensions.get('window').width - 10)),
    width: 10, 
    height: 10, 
    top: Platform.OS !== 'ios' ? 22 : 2
  },
  saveButton:{
    backgroundColor: '#23BDE4',
    flexDirection: 'row',
    height: 45,
    justifyContent: 'center'
  },
  submitButton:{
    backgroundColor: '#1DBC47',
    flexDirection: 'row',
    height: 45,
    marginTop: 10,
    justifyContent: 'center'
  },
  image:{
    alignSelf: 'center',
    marginRight: 10
  },
  saveText:{
    alignSelf: 'center',
    color: '#ffffff',
    fontSize: getAdjustedFontSize(22),
    fontWeight: 'bold'
  },
  submitText:{
    alignSelf: 'center',
    color: '#ffffff',
    fontSize: getAdjustedFontSize(22),
    fontWeight: 'bold'
  },

  // Header
  imageContainer: {
    // height: 50,
    backgroundColor: '#23bde4',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  header:{
    position: 'relative', 
    backgroundColor:'#23BDE4', 
    top: 0, 
    width: '100%', 
    height: 60, 
    justifyContent: 'center'
  },
  imageView:{
    justifyContent: 'center',
    marginLeft: 10,
    marginVertical: 15
  },
  imageHeader:{
    transform: [{ rotate: '180deg' }]
  },
  imageHeaderAR:{
  },
  noServiceText:{
    color: '#000000',
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 50
  },
  closeModelView:{
    position: 'absolute',
    right: -10,
    top: -10
  },
  resendOtpView:{
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  resendText:{
    color: '#23BDE4',
    fontSize: 16,
    alignSelf: 'center'
  },
  attatchmentsView:{
    marginTop: 15,
    paddingLeft: 10
  },
  attatchments:{
    color: '#6C6C6C',
    fontSize: 20
  }
})








