import React, {Component} from 'react';
import { Router, Scene, Drawer, Actions, Stack } from 'react-native-router-flux';
import {
	Text,
	View,
	TouchableOpacity,
	Image,
	I18nManager,
	Dimensions
} from 'react-native';
import i18n from '../Language/i18n';
import AsyncStorage from '@react-native-community/async-storage';

import Splash from '../components/Splash/index.js';
import Login from '../components/Login/Login.js';

import Registration from '../components/Registration/Registration.js';
import Registration2 from '../components/Registration/Registration2.js';
import Registration3 from '../components/Registration/Registration3.js';
import Registration4 from '../components/Registration/Registration4.js';
//Forget Password
import ForgetPassword from '../components/ForgetPassword/ForgetPassword.js';
import ForgetPassword2 from '../components/ForgetPassword/ForgetPassword2.js';
import ForgetPassword3 from '../components/ForgetPassword/ForgetPassword3.js';
// import Registration4 from '../components/Registration/Registration4.js';

import IntroScreen from '../components/IntroSlides/IntroScreen.js';
import SelectLang from '../components/IntroSlides/SelectLang.js';
import Home from '../components/Home/Home.js';
import SideMenu from '../components/SideMenu/SideMenu.js';
import ProfileDetails from '../components/ProfileDetails/ProfileDetails.js';
import ReportForm from '../components/ReportForm/ReportForm.js';
import TicketView from '../components/TicketView/TicketView.js';
import AddEditNotes from '../components/AddEditNotes/AddEditNotes.js';
import Settings from '../components/Settings/Settings.js';
import About from '../components/About/About.js';
import DeclineRequest from '../components/DeclineRequest/DeclineRequest.js';
import User from '../components/User/userProfile.js';
import ThankYou from '../components/ThankYou/ThankYou.js';
import CashBook from '../components/CashBook/Cashbook.js'
import {connect} from 'react-redux'
//Nav Bar
import CustomNavBar from '../components/CustomNavBar/CustomNavBar.js';
import CustomNavBar2 from '../components/CustomNavBar2/CustomNavBar2.js';

const screenWidth = Dimensions.get('window').width;

export default class Routes extends Component{
	constructor(props){
	  super(props)
	  this.state ={
      token: null,
	  	initial: ''
	  }
	}

	componentWillMount(){
		AsyncStorage.getItem('language').then( (value) => {
			this.setState({
				language: value
			})
		})
	}

	render(){
		let _this = this;

		return(
			<Router {...this.props}>
		    <Stack key = "root">
        <Scene
          key = "splash"
          component = {Splash}
          initial={true}
          // token={this.state.token}
          hideNavBar
        />
		    	<Drawer
			    	key="drawerMenu"
						contentComponent={SideMenu}
						drawer={true}
						tapToClose
						drawerWidth={screenWidth-(screenWidth-260)}
						hideNavBar={true}
		    		drawerPosition={this.state.language=="ar"?'right': 'left'}
		    	>
		    		<Scene
			      	key = "home"
			      	component = {Home}
							
			      	// initial={_this.props.initial == 'home'}
              		token={this.state.token}
			      	hideNavBar
			      />
			      <Scene
			      	key = "ticketView"
			      	component = {TicketView}
			      	// initial={_this.state.initial == 'ticketView'}
			      	hideNavBar
			      />
			      <Scene
			      	key = "addEditNotes"
			      	component = {AddEditNotes}
			      	// initial={_this.state.initial == 'addEditNotes'}
			      	hideNavBar
			      />
			      <Scene
			      	key = "settings"
			      	component = {Settings}
			      	// initial={_this.state.initial == 'settings'}
			      	hideNavBar
			      />
			      <Scene
			      	key = "about"
			      	component = {About}
			      	// initial={_this.state.initial == 'about'}
			      	hideNavBar
			      />
            <Scene
			      	key = "cashbook"
			      	component = {CashBook}
			      	// initial={_this.state.initial == 'cashbook'}
			      	hideNavBar
			      />
			      <Scene
			      	key = "declineRequest"
			      	component = {DeclineRequest}
			      	// initial={_this.state.initial == 'declineRequest'}
			      	hideNavBar
			      />
			      <Scene
			      	key = "thankYou"
			      	component = {ThankYou}
			      	// initial={_this.state.initial == 'thankYou'}
			      	hideNavBar
			      />
		    	</Drawer>
		      <Scene
		      	key = "login"
		      	component = {Login}
		      	title = "Login"
		      	hideNavBar
		      	// initial={_this.props.initial == 'login'}
		      />
		      <Scene
		      	key = "registration"
		      	component = {Registration}
		      	navBar={CustomNavBar}
		      	tabNubmber={1}
		      	title = "Registration"
		      	// initial={_this.state.initial == 'registration'}
		      />
		      <Scene
		      	key = "registration2"
		      	component = {Registration2}
		      	navBar={CustomNavBar}
		      	tabNubmber={2}
		      	title = "Registration2"
		      	// initial={_this.state.initial == 'registration2'}
		      />
		      <Scene
		      	key = "registration3"
		      	component = {Registration3}
		      	navBar={CustomNavBar}
		      	tabNubmber={3}
		      	title = "Registration3"
		      	// initial={_this.state.initial == 'registration3'}
		      />
		      <Scene
		      	key = "registration4"
		      	component = {Registration4}
		      	navBar={CustomNavBar}
		      	tabNubmber={4}
		      	title = "Registration4"
		      	// initial={_this.state.initial == 'registration4'}
		      />
			   <Scene
		      	key = "forgetpassword"
		      	component = {ForgetPassword}
		      	navBar={CustomNavBar2}
		      	tabNubmber={1}
		      	title ="Forget Password"
		      	// initial={_this.state.initial == 'registration'}
		      />
			  <Scene
		      	key = "forgetpasswordtwo"
		      	component = {ForgetPassword2}
		      	navBar={CustomNavBar2}
		      	tabNubmber={2}
		      	title ="Forget Password"
		      	// initial={_this.state.initial == 'registration3'}
		      />
			  <Scene
		      	key = "forgetpassword3"
		      	component = {ForgetPassword3}
		      	navBar={CustomNavBar2}
		      	tabNubmber={3}
		      	title = "Change Password"
		      	// initial={_this.state.initial == 'registration3'}
		      />
		      <Scene
		      	key = "introScreen"
		      	component = {IntroScreen}
		      	hideNavBar
		      	title = "IntroScreen"
		      	// initial={_this.state.initial == 'introScreen'}
		      />
		      <Scene
		      	key = "selectLang"
		      	component = {SelectLang}
		      	hideNavBar
		      	title = "SelectLang"
		      	// initial={_this.props.initial == 'selectLang'}
		      />
		      <Scene
		      	key = "reportForm"
		      	component = {ReportForm}
		      	hideNavBar
		      	title = "ReportForm"
		      	// initial={_this.state.initial == 'reportForm'}
		      />
          <Scene
		      	key = "user"
		      	component = {User}
		      	hideNavBar
		      	title = "User"
		      	// initial={_this.state.initial == 'user'}
		      />

		    </Stack>
  		</Router>
		)
	}
}
