import { StyleSheet, Platform, Dimensions} from 'react-native';
import { getAdjustedFontSize } from '../../Responsive/fontResponsive.js';

export default StyleSheet.create({
  container: {
  	flex: 1,
  	backgroundColor: '#ffffff'
  },
  mainView:{
  	flex: 1,
  	justifyContent: 'space-between',
  	backgroundColor: '#ffffff'
  },
  title:{
  	marginTop: 20,
  	fontSize: getAdjustedFontSize(16),
  	color: '#000000',
  	marginLeft: 10,
    alignSelf: 'flex-start'
  },
  pickerView:{
    backgroundColor: '#f8f8f8',
  	marginTop: 10,
    height: 50,
    justifyContent: 'center',
    paddingLeft: 15,
  },
  pickerViewAR:{
    backgroundColor: '#f8f8f8',
    marginTop: 10,
    height: 50,
    justifyContent: 'center',
    paddingRight: 15
  },
  picker:{
  	height: 50,
  	width: '100%',
    backgroundColor: 'transparent',
    justifyContent:'center',
  },
  dropdownImage:{
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
    // alignSelf: 'center'
  },
  dropdownArrowView:{
    position: 'absolute',
    right: 15,
    width: 10,
    height: 10,
    // justifyContent: 'center',
    top: 22
  },
  dropdownArrowViewAR:{
    position: 'absolute',
    left: Platform.OS === 'ios' ? (-(Dimensions.get('window').width - 20)) : (-(Dimensions.get('window').width - 10)),
    width: 10,
    height: 10,
    // justifyContent: 'center',
    top: 22
  },
  continueButton:{
  	height: 50,
  	width: '100%',
  	justifyContent: 'center',
  	backgroundColor: '#23bde4'
  },
  continueButtonBG:{
  	height: 50,
  	width: '100%',
  	backgroundColor: '#23bde4'
  },
  buttonText:{
  	color: '#ffffff',
  	alignSelf: 'center',
  	fontSize: getAdjustedFontSize(20)
  },

  // Registration2
  numberInput:{
  	paddingLeft: Platform.OS === 'ios' ? 0 :  10
  },

  // Registraion3
  codeTitle:{
  	fontSize: getAdjustedFontSize(26),
  	color: '#000000',
  	alignSelf: 'center',
  	marginTop: 100
  },
  codeView:{
  	marginTop: 10,
  	height: 100
  },
  codeInput:{ height: 50, width: 50, fontSize: 18, borderWidth: 1, backgroundColor: '#F8F8F8' },
  
  resendView:{
  	marginTop: 20,
  	flexDirection: 'row',
  	justifyContent: 'center'
  },
  firstText:{
  	fontSize: getAdjustedFontSize(16),
  	color: '#000000'
  },
  resendText:{
  	color:'#23bde4',
  	marginLeft: 5,
  	fontSize: getAdjustedFontSize(16)
  },
  modalView:{
    padding: 15, 
    flex: 1,
    backgroundColor: '#ffffff'
  },
  itemView:{
    height: 40,
    paddingLeft: 10
  },
  itemText:{
    color: '#000',
    fontSize: 16
  },
  searchCountryField:{
    height: 46,
    width: '100%',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 23
  },
  searchCountryFieldView:{
    marginVertical: 10
  }
})



















