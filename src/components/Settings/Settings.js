import React, {Component} from 'react';
import {
	Text,
	View,
	StatusBar,
	TouchableOpacity,
	Dimensions,
	Image,
	I18nManager,
	BackHandler
} from 'react-native';
import styles from './Style';
import i18n from '../../Language/i18n';
import RNRestart from 'react-native-restart';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import CustomHeader from '../ProfileDetails/CustomHeader.js';
import { Dropdown } from 'react-native-material-dropdown';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const screenWidth = Math.round(Dimensions.get('window').width);
import {getAdjustedFontSize} from '../../Responsive/fontResponsive';
import Modal from "react-native-modal";

class Settings extends Component{
	constructor(props){
		super(props);
		this.state={
			language: '',
			uuid: props.ticketDetails && props.ticketDetails.user_technician.uuid,
			selectedValue: props.ticketDetails && props.ticketDetails.user_technician.accept_tickets==='accept'? i18n.t('accept') : i18n.t('not_accept'),
			languageData: [
				{
					value: 'English'
				},
				{
					value: i18n.t('arabic')
				}
			],
      acceptTicket: [
      	{
			  value: i18n.t('accept'),
      	},
      	{
			  value: i18n.t('not_accept'),
      	}
      ],
		}
	}

	componentDidMount() {
		// props.userData.user_technician.accept_tickets
		BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
	}

	handleBackPress = () =>{
		Actions.pop();
		return true;
	}

	componentWillUnmount = () => {
		BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
	}



	handleChange = (ticketRes) => {
		const selectedTicket = ticketRes=== 1 ? 'not_accept': 'accept';
		const {uuid} = this.state
		AsyncStorage.getItem('TOKEN').then((value) => {
			this.setState({token: value,firstTime: true})
			this.props.ticketSettings({
				token: value,
				uuid: uuid,
				acceptTicket: selectedTicket
			})
		})
	  }

	componentWillReceiveProps(nextProps){
		const {token,firstTime} = this.state;
		if(nextProps.ticketSetting) {
			this.setState({
				successMesssge: nextProps.ticketSetting.message,
				successModal: false,
				selectedValue: nextProps.ticketSetting.technician.accept_tickets==='accept'? i18n.t('accept') : i18n.t('not_accept'),
			  },()=>{setTimeout(() => {
			  this.setState({successModal: false,firstTime:false })
				// if(firstTime){
				// 	this.props.getUserData(token)
				// }
			}, 2000)})
		}
	  }

	handleLanguage = (value) => {
    if (value === "English") {
      this.selectEN()
    } else {
      this.selectAR()
    }
  }

  selectEN = () => {
    this.setState({
      checkedEN: true,
      checkedAR: false
    })
    AsyncStorage.setItem('language', 'en');
    i18n.locale = 'en'
    if (I18nManager.isRTL) {
      setTimeout(()=>{
          RNRestart.Restart();
      }, 1000);

    }
    I18nManager.forceRTL(false);
  }

  selectAR = () => {

    this.setState({
      checkedEN: false,
      checkedAR: true
    })
    AsyncStorage.setItem('language', 'ar');
    i18n.locale = 'ar'
    if (!I18nManager.isRTL) {
      setTimeout(()=>{
          RNRestart.Restart();
      }, 1000);
    }
    I18nManager.forceRTL(true);
  }

	componentWillMount(){
		AsyncStorage.getItem('language').then( (value) => {
      this.setState({language: value})
    });
	}

	render(){

		return(
			<View style={styles.container}>
				<View style={styles.header}>
      		<CustomHeader settingScreen={true}/>
      	</View>
      	<StatusBar backgroundColor="#2383c3" barStyle="light-content" />
				<View style={styles.languageView}>
					<Text style={styles.languageText}>
						{i18n.t('language')}
					</Text>
				</View>
				<View style={styles.languageSelectView}>
					<Dropdown
            label=''
            data={this.state.languageData}
            value={i18n.locale==='ar'? this.state.languageData[1].value : this.state.languageData[0].value}
            labelHeight={ 0 }
            dropdownOffset={{top: 0, left: 0}}
            fontSize={15}
            labelFontSize={15}
            textColor={'#707070'}
            itemColor={'#707070'}
            rippleInsets={{top: -5, bottom: 0, right: 0, left: 0}}
            containerStyle={{height: 50, width: '100%', backgroundColor: '#F8F8F8', padding: 10}}
            inputContainerStyle={{borderBottomWidth: 0 }}
            onChangeText={(value)=> this.handleLanguage(value)}
          />
				</View>
				<View style={styles.acceptTitleView}>
					<Text style={styles.acceptTitle}>
						{i18n.t('acceptTickets')}
					</Text>
				</View>
				<View style={styles.acceptSelectView}>
					<Dropdown
            label=''
            data={this.state.acceptTicket}
            value={this.state.selectedValue}
            labelHeight={ 0 }
            dropdownOffset={{top: 0, left: 0}}
            fontSize={15}
            labelFontSize={15}
            textColor={'#707070'}
            itemColor={'#707070'}
            rippleInsets={{top: -5, bottom: 0, right: 0, left: 0}}
            containerStyle={{height: 50, width: '100%', backgroundColor: '#F8F8F8', padding: 10}}
            inputContainerStyle={{borderBottomWidth: 0 }}
            onChangeText={(value,index)=> {{this.setState({indexTicket: index}); this.handleChange(index)}}}
          />
				</View>

				<View>
					<Modal
					animationInTiming={1000}
					animationOutTiming={1000}
					animationIn="fadeIn"
					animationOut="fadeOut"
					onBackdropPress={()=>{this.setState({successModal: false})}}
					isVisible={this.state.successModal}>
					<View
						style={{
						width: screenWidth-20,
						alignSelf: 'center',
						padding: 10,
						paddingVertical: 20,
						borderRadius: 25,
						overFlow: 'hidden',
						backgroundColor: '#23BDE4'
						}}>

						<View style={{
							width: 120,
							height: 120,
							position: 'absolute',
							top: -60,
							alignSelf: 'center'
						}}>
						<Image
							style={{ width: '100%', height: '100%',resizeMode: 'contain'}}
							source={i18n.locale==='ar'? require('../../assets/Images/successAR.svg'): require('../../assets/Images/successImage.svg')}
							/>
						</View>
						<View style={{marginTop: 70}}>
						<Text style={{ color: '#ffffff', fontSize: getAdjustedFontSize(32), alignSelf: 'center',}}>
							{i18n.t('success')}
						</Text>
						</View>

						<View style={{alignSelf: 'center',justifyContent: 'center',alignItems: 'center',marginTop: 20,width: screenWidth-100}}>
						{this.state.successMesssge &&
							<Text style={{ color: '#ffffff', fontSize: getAdjustedFontSize(14), fontWeight: '600', alignSelf: 'center',textAlign: 'center' }}>
							{this.state.successMesssge}
							</Text>
						}
						</View>
					</View>
					</Modal>
					{/* error modal  */}

					<Modal
					animationInTiming={1000}
					animationOutTiming={1000}
					animationIn="fadeIn"
					animationOut="fadeOut"
					backdropOpacity={0.5}
					onBackdropPress={()=>{this.setState({errorModal: false})}}
					isVisible={this.state.errorModal}>
						<View
						style={{
						width: screenWidth-20,
						alignSelf: 'center',
						padding: 10,
						paddingVertical: 20,
						borderRadius: 25,
						overFlow: 'hidden',
						backgroundColor: '#F15E5E'
						}}>

						<View style={{
							width: 120,
							height: 120,
							position: 'absolute',
							top: -60,
							alignSelf: 'center'
							}}>
							<Image
							style={{ width: '100%', height: '100%',resizeMode: 'contain'}}
							source={require('../../assets/Images/cancel.svg')}
							/>
						</View>
						<View style={{marginTop: 70}}>
							<Text style={{ color: '#ffffff', fontSize: getAdjustedFontSize(32), alignSelf: 'center',}}>
							{i18n.t('error')}
							</Text>
						</View>

						<View style={{alignSelf: 'center',justifyContent: 'center',alignItems: 'center',marginTop: 20,width: screenWidth-100}}>
							{this.state.errorMesssge &&
							<Text style={{ color: '#ffffff', fontSize: getAdjustedFontSize(14), fontWeight: '600', alignSelf: 'center',textAlign: 'center' }}>
							{this.state.errorMesssge}
							</Text>
							}
						</View>
					</View>
					</Modal>
				</View>

			</View>
		)
	}
}

function mapStateToProps(state) {
  return {
		ticketDetails: state.jobs.userData,
		ticketSetting: state.ticket.ticketSetting
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(Settings);
