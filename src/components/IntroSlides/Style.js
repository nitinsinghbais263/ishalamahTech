import { StyleSheet, Dimensions, Platform } from 'react-native';
import { getAdjustedFontSize } from '../../Responsive/fontResponsive.js';

module.exports = StyleSheet.create({

  container: { 
  	flex: 1, 
  	overflow: 'hidden',
  	paddingTop: (Platform.OS) === 'ios' ? 20 : 0, 
  	alignItems: 'center', 
  	justifyContent: 'center', 
  	padding: 20 
  },
  backgroundImageView:{
  	width: '130%',
  	height: '65%',
  	justifyContent: 'center',
  	flex: 1,
  	left: -115,
  	top: 120,
  	position: 'absolute'
  },
  backgroundImageViewAR:{
    width: '130%',
    height: '65%',
    justifyContent: 'center',
    flex: 1,
    right: -115,
    top: 120,
    position: 'absolute'
  },
  backgroundImage:{ 
  	width: '100%',
  	height: '115%',
  	resizeMode: 'contain',
  	// transform: [{ rotate: '5deg' }]
  },
  title:{ 
  	fontSize: getAdjustedFontSize(26), 
  	color: '#23BDE4', 
  	fontWeight: 'bold', 
  	textAlign: 'center',  
  	marginBottom: 10
  },
  text:{ 
  	color: '#6C6C6C', 
  	fontSize: getAdjustedFontSize(20),
  	textAlign: 'center',
  	marginTop: 10
  },
  image:{ 
  	width: 150,
  	height: 150, 
  	resizeMode: 'contain',
  	marginBottom: 20
  },
  topImage:{
  	flex: 1,
  	// backgroundColor: 'yellow',
  	justifyContent: 'flex-end'
  },
  bottom:{
  	flex: 1,
  	justifyContent: 'flex-end',
  	// backgroundColor: 'pink'
  },
  englishView:{
  	flexDirection: 'row'
  },
  englishTextView:{
  	width: '80%'
  },
  arabicTextView:{
  	width: '80%'
  },
  englishbuttonView:{
  	width: '20%',
  	justifyContent: 'center'
  },
  continueText:{
    alignSelf: 'flex-start',
  	fontSize: getAdjustedFontSize(20),
  	color: '#63d0ec'
  },
  continueTextAR:{
  	fontSize: getAdjustedFontSize(20),
  	color: '#63d0ec',
  	alignSelf: 'flex-start'
  },
  englishText:{
    alignSelf: 'flex-start',
  	fontSize: getAdjustedFontSize(26),
  	color: '#285db3',
  	fontWeight: 'bold',
  	marginTop: 5
  },
  arabicText:{
  	alignSelf: 'flex-start',
  	fontSize: getAdjustedFontSize(26),
  	color: '#285db3',
  	fontWeight: 'bold',
  	marginTop: 5
  },
  englishContent:{
    alignSelf: 'flex-start',
  	marginTop: 10,
    textAlign: 'left',
  	fontSize: getAdjustedFontSize(18),
  },
  arabicContent:{
  	alignSelf: 'flex-start',
  	marginTop: 10,
  	textAlign: 'left',
  	fontSize: getAdjustedFontSize(18),
  },
  rigthImage:{
  	alignSelf: 'flex-end'
  },
  arabicView:{
  	flexDirection: 'row',
  	marginTop: 15
  }
});