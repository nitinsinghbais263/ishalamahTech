import { StyleSheet, Dimensions, Platform} from 'react-native';
import { getAdjustedFontSize } from '../../Responsive/fontResponsive.js';

const sysWidth = Dimensions.get('window').width;
const sysHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
  	flex: 1,
  	backgroundColor: '#285db3'
  },
  containerScroll:{
  	// flex: 1,
  	backgroundColor: '#285db3'
  },
  bgImageView:{
  	width: (Platform.OS) === 'ios' ? '123%' : '150%',
  	height: (Platform.OS) === 'ios' ? '80%' : '80%',
  	justifyContent: 'center',
  	flex: 1,
  	left: (Platform.OS) === 'ios' ? -147 : -240,
  	top: (Platform.OS) === 'ios' ? 40 : 60,
  	position: 'absolute'
  },
  bgImageViewAR:{
  	width: '115%',
  	height: '80%',
  	justifyContent: 'center',
  	flex: 1,
  	right: -125,
  	top: 35,
  	position: 'absolute'
  },
  bgImage:{
  	width: (Platform.OS) === 'ios' ? '101%' : '115%',
  	height: (Platform.OS) === 'ios' ? '100%' : 465,
  	resizeMode: 'contain',
  },
  imageView:{
  	flex: 2,
  	// backgroundColor: 'green',
  	justifyContent: 'center'
  },
  inputView:{
  	flex: 2,
  	marginTop: 20,
    // backgroundColor: 'green',
  	justifyContent: 'center'
  },
  bottomView:{
  	flex: 1,
  	justifyContent: 'flex-end',
  },
  registerView:{
  	flexDirection: 'row',
  	alignSelf: 'center',
  	marginBottom: 20,
  	marginTop: 20
  },
  logoImage:{
  	width: (Platform.OS) === 'ios' ? 165 : 165,
  	height: (Platform.OS) === 'ios' ? 165 : 160,
  	resizeMode: 'contain',
  	alignSelf: 'center',
    marginTop: (Platform.OS) === 'ios' ? 50 : 55,
    marginRight: (Platform.OS) === 'ios' ? 0 : 20
  },
  phone:{
  	backgroundColor: '#2383c3',
  	borderRadius: 10,
  	alignSelf: 'center',
  	width: '90%',
  	height: 50,
  	marginBottom: 20,
  	marginTop: 15,
  	paddingLeft: 15,
  	color: '#ffffff',
    fontSize: getAdjustedFontSize(20)
  },
  password:{
  	backgroundColor: '#2383c3',
  	borderRadius: 10,
  	alignSelf: 'center',
  	width: '90%',
  	height: 50,
  	paddingLeft: 15,
  	color: '#ffffff',
    fontSize: getAdjustedFontSize(20)
  },
  forgotView:{
  	width: '50%',
  	alignSelf: 'flex-end',
  	justifyContent: 'center',
  	marginTop: 18,
  	marginBottom: 18
  },
  forgotText:{
  	color: '#ffffff',
  	alignSelf: 'center',
  	marginLeft: 10,
    fontSize: getAdjustedFontSize(15)
  },
  loginButton:{
  	width: '100%',
  	backgroundColor: '#23bde4',
  	justifyContent: 'center',
  	alignSelf: 'center',
  	borderRadius: 10,
  	height: 50
  },
  loginButtonBG:{
  	width: '90%',
  	backgroundColor: '#23bde4',
  	justifyContent: 'center',
  	alignSelf: 'center',
  	borderRadius: 10,
  	height: 50,
    marginBottom: (Platform.OS) === 'ios' ? 35 : 0
  },
  loginText:{
  	color: '#ffffff',
  	alignSelf: 'center',
    fontSize: getAdjustedFontSize(20),
    fontWeight: 'bold'
  },
  accountTitle:{
  	color: '#ffffff',
    fontSize: getAdjustedFontSize(18),
  },
  register:{
  	color: '#83dbf2',
    fontSize: getAdjustedFontSize(18),
  },
  registerText:{
  	marginLeft: 5
  }
})
