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
  ticketTopView:{
  	height: 267,
  	width: '100%',
  	backgroundColor: '#ffffff'
  },
  imageBack:{
  	flex: 1,
  	justifyContent: 'flex-start'
  },
  imageBackView:{
  	marginBottom: 30,
  	height: 240,
  	width: '100%'
  },
  clientTitleView:{
  	alignSelf: 'center',
  	marginTop: 30
  },
  clientTitleText:{
  	alignSelf: 'center',
  	justifyContent: 'center',
  	color: '#EFEFEF',
  	fontSize: getAdjustedFontSize(15)
  },
  companyNameView:{
  	alignSelf: 'center',
  	justifyContent: 'center',
  	marginTop: 8
  },
  companyNameText:{
  	alignSelf: 'center',
  	color: '#EFEFEF',
  	fontSize: getAdjustedFontSize(20)
  },
  dateView:{
  	alignSelf: 'center',
  	flexDirection: 'row',
  	justifyContent: 'space-between',
  	marginTop: 8
  },
  dayText:{
  	color: '#EFEFEF',
  	fontSize: getAdjustedFontSize(11)
  },
  dateText:{
  	color: '#EFEFEF',
  	fontSize: getAdjustedFontSize(11),
  	marginLeft: 10
  },
  timeText:{
  	color: '#EFEFEF',
  	fontSize: getAdjustedFontSize(11),
  	marginLeft: 10
  },
  clientProfileImageView:{
  	height: 140,
  	width: 140,
  	alignSelf: 'center',
  	overflow: 'hidden',
  	position: 'absolute',
  	bottom: 2,
  	borderRadius: 70,
  	borderWidth: 3,
  	borderColor: '#ffffff'
  },
  clientProfileImage:{
  	resizeMode: 'cover',
  	height: '100%',
  	width: '100%'
  },
  threeImageView:{
  	flexDirection: 'row',
  	justifyContent: 'center',
  	height: 60,
  	width: '100%',
  	marginTop: 40
  },
  ticketArrowsView:{
  	height: 56,
  	width: 56,
  	borderRadius: 28,
  	backgroundColor: '#23BDE4',
  	justifyContent: 'center'
  },
  ticketArrows:{
  	height: 36,
  	width: 36,
  	resizeMode: 'contain',
  	alignSelf: 'center'
  },
  ticketLocationView:{
  	height: 56,
  	width: 56,
  	borderRadius: 28,
  	marginLeft: 40,
  	backgroundColor: '#23BDE4',
  	justifyContent: 'center'
  },
  ticketLocation:{
  	height: 30,
  	width: 30,
  	resizeMode: 'contain',
  	alignSelf: 'center'
  },
  ticketPhoneView:{
  	height: 56,
  	width: 56,
  	borderRadius: 28,
  	marginLeft: 40,
  	backgroundColor: '#23BDE4',
  	justifyContent: 'center'
  },
  ticketPhone:{
  	height: 36,
  	width: 36,
  	resizeMode: 'contain',
  	alignSelf: 'center'
  },
  detailsTitleView:{
  	marginTop: 40,
  	paddingLeft: 10
  },
  detailsTitle:{
  	fontSize: getAdjustedFontSize(20),
  	color: '#6C6C6C'
  },
  monthlycheckView:{
  	marginTop: 20,
  	paddingLeft: 10,
  	backgroundColor: '#F8F8F8',
  },
  monthlycheckTitle:{
  	color: '#6C6C6C',
  	fontSize: getAdjustedFontSize(15),
  	marginTop: 6,
  	fontWeight: 'bold'
  },
  monthlycheckDesc:{
  	color: '#6C6C6C',
  	fontSize: getAdjustedFontSize(15),
  	marginTop: 10,
  	marginBottom: 15
  },
  relatedServiceView:{
  	marginTop: 20,
  	paddingLeft: 10
  },
  relatedService:{
  	fontSize: getAdjustedFontSize(20),
  	color: '#6C6C6C'
  },
  ticketMenuView:{
  	flexDirection: 'row',
  	justifyContent: 'space-between',
  	backgroundColor: '#F8F8F8',
  	padding: 10,
  	marginTop: 10
  },
  serviceCodeText:{
  	color: '#6C6C6C',
  	fontSize: getAdjustedFontSize(15)
  },
  completedButtonBG:{
  	backgroundColor: '#1DBC47',
  	height: 50,
  	width: '100%',
  	justifyContent: 'center',
  	marginTop: Platform.OS==='ios'?2: 0
  },
  completedButton:{
  	backgroundColor: '#1DBC47',
  	height: 50,
  	width: '100%',
  	justifyContent: 'center',
  	flexDirection: 'row'
  },
  ticketRightSign:{
  	alignSelf: 'center'
  },
  completedText:{
  	color: '#ffffff',
  	fontSize: getAdjustedFontSize(22),
  	marginLeft: 15,
  	fontWeight: 'bold',
  	alignSelf: 'center'
  },
  notesTextView:{
  	marginTop: 30,
  	paddingLeft: 10
  },
  notesText:{
  	color: '#6C6C6C',
  	fontSize: getAdjustedFontSize(20)
  },
  notesFristView:{
  	marginTop: 15,
  	backgroundColor: '#F8F8F8',
  	padding: 10
  },
  notesDateView:{
  	flexDirection: 'row',
  	justifyContent: 'space-between'
  },
  notesTitleView:{

  },
  notesTitle:{
  	color: '#6C6C6C',
  	fontSize: getAdjustedFontSize(15),
  	fontWeight: 'bold'
  },
  notesDate:{
  	flexDirection: 'row',
  	alignSelf: 'center'
  },
  dateNotes:{
  	color: '#6C6C6C',
  	fontSize: getAdjustedFontSize(11)
  },
  notesTime:{
  	color: '#6C6C6C',
  	fontSize: getAdjustedFontSize(11),
  	marginLeft: 10
  },
  notesDescView:{
  	marginTop: 10
  },
  notesDesc:{
  	color: '#6C6C6C',
  	fontSize: getAdjustedFontSize(15)
  },
  imageView:{
  	flexDirection: 'row',
  	marginTop: 20
  },
  oneImageView:{
  	height: 50,
  	width: 50,
  	marginRight: 5,
  	borderBottomLeftRadius: 7,
  	borderBottomRightRadius: 7,
  	borderTopLeftRadius: 7,
  	borderTopRightRadius: 7,
  	overflow: 'hidden'
  },
  imageNots:{
  	height: '100%',
  	width: '100%',
  	resizeMode: 'cover'
  },
  publicTextView:{
  	justifyContent: 'flex-end',
  	flexDirection: 'row',
  	marginBottom: 10
  },
  ticketSmallRightSign:{
  	alignSelf: 'center'
  },
  publicText:{
  	color: '#F24214',
  	alignSelf: 'center',
  	fontSize: getAdjustedFontSize(13),
  	marginLeft: 10
  },
  notesSecondView:{
  	marginTop: 30,
  	backgroundColor: '#F8F8F8',
  	padding: 10
  },
  notesSecondDateView:{
  	flexDirection: 'row',
  	justifyContent: 'space-between'
  },
  notesSecondNameView:{

  },
  notesSecondName:{
  	color: '#6C6C6C',
  	fontSize: getAdjustedFontSize(15),
  	fontWeight: 'bold'
  },
  notesSecondViewDate:{
  	flexDirection: 'row',
  	alignSelf: 'center'
  },
  notesSecondDate:{
  	color: '#6C6C6C',
  	fontSize: getAdjustedFontSize(11)
  },
  notesSecondTime:{
  	color: '#6C6C6C',
  	marginLeft: 10,
  	fontSize: getAdjustedFontSize(11)
  },
  notesSecondDescView:{
  	marginTop: 10,
  	marginBottom: 20
  },
  notesSecondDesc:{
  	color: '#6C6C6C',
  	fontSize: getAdjustedFontSize(15)
  },
  addNotesButtonBG:{
  	marginTop: 20,
  	height: 50,
  	width: '100%',
  	backgroundColor: '#23BDE4'
  },
  addNotesButton:{
  	height: 50,
  	width: '100%',
  	backgroundColor: '#23BDE4',
  	justifyContent: 'center',
  	flexDirection: 'row'
  },
  ticketPlusSign:{
  	alignSelf: 'center'
  },
  addNoteText:{
  	color: '#ffffff',
  	fontSize: getAdjustedFontSize(22),
  	fontWeight: 'bold',
  	alignSelf: 'center',
  	marginLeft: 10
  },
  bottomView:{
	position: 'absolute',
	bottom: 0,
	width: '100%',
	backgroundColor: '#ffffff',
},
resendText:{
  color: '#23BDE4',
  fontSize: 16,
  alignSelf: 'center'
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
});
