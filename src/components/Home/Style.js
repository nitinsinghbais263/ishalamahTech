import { StyleSheet, Dimensions, Platform } from 'react-native';
import { getAdjustedFontSize } from '../../Responsive/fontResponsive.js';

module.exports = StyleSheet.create({

  container: {
  	flex: 1,
  	backgroundColor: '#ffffff'
  },
  statusView:{
  	flexDirection: 'row'
  },
  performanceView:{
  	width: '50%',
  	backgroundColor: '#23BDE4',
  	padding: 10
  },
  totalTicketView:{
  	width: '50%',
  	backgroundColor: '#285DB3',
  	padding: 10
  },
  overallTextView:{
    height: 30
  },
  overallText:{
  	color: '#ffffff',
  	fontSize: getAdjustedFontSize(14),
  	fontWeight: 'bold'
  },
  overallPointsText:{
  	color: '#ffffff',
  	alignSelf: 'center',
  	fontSize: getAdjustedFontSize(46),
  	marginVertical: 30,
  	fontWeight: 'bold'
  },
  ticketCountText:{
  	color: '#ffffff',
  	fontSize: getAdjustedFontSize(14),

  },
  totalTextView:{
    height: 30
  },
  totalText:{
  	color: '#ffffff',
  	fontSize: getAdjustedFontSize(14),
  	fontWeight: 'bold',

  },
  thisMonthText:{
  	color: '#ffffff',
  	fontSize: getAdjustedFontSize(14),
  	fontWeight: 'bold',

  },
  countText:{
  	color: '#ffffff',
  	alignSelf: 'center',
  	fontSize: getAdjustedFontSize(46),
  	marginVertical: 30,
  	fontWeight: 'bold',

  },
  thisWeekText:{
  	color: '#ffffff',
  	fontSize: getAdjustedFontSize(14),

  },
  previousView:{
  	marginTop: 10
  },
  previousJobsTextView:{
  	padding: 10
  },
  previousJobsText:{
  	color: '#6C6C6C',
  	fontSize: getAdjustedFontSize(20),

  },
  listView:{
  	marginTop: 10,
  	marginBottom: 10
  },
  listCards:{
  	backgroundColor: '#F8F8F8',
  	borderWidth: 0.5,
  	borderColor: '#E8E8E8',
  	padding: 15
  },
  nameText:{
  	fontSize: getAdjustedFontSize(18),
  	color: '#6C6C6C',
  	fontWeight: 'bold',

  },
  dateText:{
  	color: '#6C6C6C',
  	fontSize: getAdjustedFontSize(15),
  	marginTop: 5
  },
  rating: {
  	// justifyContent: 'flex-start',
  	// padding: 0,
  	// width: 95,
  	marginTop: 5,
    //justifyContent: 'flex-start',
    justifyContent: 'flex-end',
    padding: 0,
    width: 100,
    position: 'relative'
  	// backgroundColor: 'red'
  },
  header:{
  	position: 'relative',
  	backgroundColor:'#23BDE4',
  	top: 0,
  	width: '100%',
  	height: 60,
  	justifyContent: 'center',
    shadowOffset:{  width: 0,  height: 0,  },
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 0.8,
    elevation: 3,
  },
  WaitingAcceptanceView:{
  	marginTop: 10
  },
  waitingTitleView:{
  	flexDirection: 'row',
  	justifyContent: 'space-between',
  	paddingHorizontal: 10,
  	paddingVertical: 15
  },
  waitingTitle:{
  	fontSize: getAdjustedFontSize(20),
  	color: '#6C6C6C',

  },
  time:{
  	fontSize: getAdjustedFontSize(20),
  	color: '#285DB3',
  	fontWeight: 'bold'
  },
  waitingDetailView:{
  	backgroundColor: '#F8F8F8',
  	padding: 10
  },
  clientLocationView:{
  	flexDirection: 'row',
  	justifyContent: 'space-between',
  	marginTop: 10
  },
  clientBoyView:{
  	flexDirection: 'row',
  	justifyContent: 'space-between'
  },
  clientDateView:{
  	flexDirection: 'row',
  	justifyContent: 'space-between',
  	marginTop: 10,
  	marginBottom: 30
  },
  dateView:{
  	flexDirection: 'row',
  	justifyContent: 'space-between'
  },
  timeText:{
  	marginLeft: 10,
  	color: '#6C6C6C',

  },
  WaitingAcceptanceButtons:{
  	flexDirection: 'row',
  	paddingHorizontal: 15,
  	marginTop: -25
  },
  declineButton:{
  	height: 50,
  	backgroundColor: '#F24214',
  	width: '100%',
  	flexDirection: 'row'
  },
  declineButtonBG:{
  	height: 50,
  	backgroundColor: '#F24214',
  	width: '50%',
  	justifyContent: 'center'
  },
  declineText:{
  	color: '#ffffff',
  	fontWeight: 'bold',
  	alignSelf: 'center',
  	fontSize: getAdjustedFontSize(18),
  	marginLeft: 5,

  },
  declineCrossImage:{
  	alignSelf: 'center',
  	marginLeft: 5
  },
  acceptButton:{
  	height: 50,
  	backgroundColor: '#23BDE4',
  	width: '100%',
  	justifyContent: 'center',
  	flexDirection: 'row'
  },
  acceptButtonBG:{
  	height: 50,
  	backgroundColor: '#23BDE4',
  	width: '50%',
  	justifyContent: 'center'
  },
  acceptText:{
  	color: '#ffffff',
  	fontWeight: 'bold',
  	alignSelf: 'center',
  	fontSize: getAdjustedFontSize(18),
  	marginLeft: 5,

  },
  acceptRightImage:{
  	alignSelf: 'center'
  },
  clientText:{
  	color: '#6C6C6C',

  },
  boyText:{
  	color: '#6C6C6C',

  },
  locationText:{
  	color: '#6C6C6C',

  },
  stateText:{
  	color: '#6C6C6C',

  },
  assignedText:{
  	color: '#6C6C6C',

  },
  assignDateText:{
  	color: '#6C6C6C',

  },
  timeText:{
  	color: '#6C6C6C',

  },
  notAcceptanceView:{
  	backgroundColor: '#F24214',
  	padding: 10,
  	flexDirection: 'row'
  },
  notTitleText:{
  	color: '#ffffff',
  	fontWeight: 'bold',

  },
  descriptionText:{
  	color: '#ffffff',
  	fontSize: getAdjustedFontSize(11),
  	marginTop: 5,

  },
  notTitleView:{
  	width: '75%'
  },
  switchView:{
  	width: '25%',
  	justifyContent: 'flex-end',
  	flexDirection: 'row'
  },
  switchViewBG:{
  	backgroundColor: '#ffffff',
  	justifyContent: 'center',
  	height: Platform.OS === 'ios' ? 38 : 30,
  	width: Platform.OS === 'ios' ? 60 : 52,
  	borderRadius: Platform.OS === 'ios' ? 19 : 15,
  	alignSelf: 'center'
  },
  serverErrorView:{
    alignSelf: 'center',
    marginTop: 10
  },
  serverErrorText:{
    fontSize: getAdjustedFontSize(18),
    color: '#6C6C6C',
    alignSelf: 'center',
    fontWeight: '600',

  }
})
