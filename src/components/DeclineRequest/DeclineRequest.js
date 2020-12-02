import React, {Component} from 'react';
import { Text, View, Image, StatusBar, TouchableOpacity, SafeAreaView, I18nManager, TextInput, BackHandler, Dimensions } from 'react-native';
import styles from './Style';
import i18n from '../../Language/i18n';
import CustomHeader from '../ProfileDetails/CustomHeader.js';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class DeclineRequest extends Component<Props> {
	constructor(props){
		super(props);
		this.state={
			token: "",
			uuid: "",
			reason: ""
		}
	}

	componentDidMount(){
		BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
	}

	handleBackPress = () =>{
		Actions.ticketView();
		return true;
	}

	componentWillUnmount = () => {
		BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
	}


	onSubmit(){

    AsyncStorage.getItem('TOKEN').then((value) => {
      this.setState({token: value})
			this.setState({uuid: this.props.uuid})
      this.props.refuseTicket(this,{
        token: this.state.token,
        uuid: this.state.uuid,
        reason: this.state.reason
      })
    })
  }

	render(){

		return(
			<View style={styles.container}>
				<View style={styles.header}>
				<TouchableOpacity
					onPress={Actions.pop}
					style={{flexDirection: 'row'}}
					activeOpacity={0.8}
				>
					<Image
						source={require('../../assets/Images/Next.svg')}
						style={{...styles.image,transform: [{rotate: i18n.locale==='ar'? '0deg': '180deg'}]}}
						resizeMode = 'contain'
					/>
				</TouchableOpacity>
      	</View>
      	<StatusBar backgroundColor="#2383c3" barStyle="light-content" />
      	<View style={{width: screenWidth, height: '90%',justifyContent: 'space-between',  backgroundColor: '#ffffff'}}>
					<View>
						<View>
							<View style={styles.reasonView}>
								<Text style={styles.reasonText}>{i18n.t('reason')}</Text>
							</View>
							<View style={styles.reasonDescView}>
								<Text style={styles.reasonDescText}>
									{i18n.t('cancelMassge')}
								</Text>
							</View>
						</View>
						<View style={styles.inputFieldView}>
							<TextInput
								value={this.state.content}
								onChangeText={(reason)=>{ this.setState({reason: reason}) }}
								style={styles.contentInput}
								placeholderTextColor="#707070"
								placeholderStyle={styles.placeholdersStyle}
								placeholder={i18n.t('typeHere')}
							/>
						</View>
					</View>
					<View style={styles.buttonViewBG}>
						<TouchableOpacity style={styles.buttonView} onPress={() => this.onSubmit()} activeOpacity={0.9}>
							<Text style={styles.buttonText}> {i18n.t('done')} </Text>
						</TouchableOpacity>
					</View>
				</View>
				<SafeAreaView style= {{backgroundColor: '#23BDE4'}}/>
			</View>
		)
	}
}


function mapStateToProps(state) {
  return {
    success: state.success ,
    error: state.error,
    message: state.message,
    refuseTicket: state.ticket.refuseTicket,
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(DeclineRequest);
