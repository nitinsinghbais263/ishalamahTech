import React, {Component} from 'react';
import {
	Text,
	View,
	StatusBar,
	TouchableOpacity,
	I18nManager,
	TextInput,
	BackHandler
} from 'react-native';
import styles from './Style';
import i18n from '../../Language/i18n';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';

export default class ThankYou extends Component<Props> {
	constructor(props){
		super(props);
		this.state={
		}
	}

	componentDidMount() {
		BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
	}

	handleBackPress = () =>{
		Actions.pop();
		return true;
	}

	componentWillUnmount = () => {
		BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
	}

	render(){
		return(
			<View style={styles.container}>
				<View style={styles.header}></View>
      	<StatusBar backgroundColor="#2383c3" barStyle="light-content" />
      	<View style={styles.textView}>
			<Text style={styles.heading}>{i18n.t('thankYou')}</Text>
          <Text style={styles.message}>
		  {i18n.t('thankMessage')}
          </Text>
        </View>
        <View style={styles.buttonBG}>
        	<TouchableOpacity activeOpacity={0.9} style={styles.button} onPress={()=> Actions.replace("home")} >
        		<Text style={styles.buttonText}> {i18n.t('done')} </Text>
        	</TouchableOpacity>
        </View>
			</View>
		)
	}
}
