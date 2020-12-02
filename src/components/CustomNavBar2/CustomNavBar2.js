import React, {Component} from 'react';
import {
	Text, 
	View,
	Image,
	TouchableOpacity,
} from 'react-native';
import styles from './Style';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import i18n from '../../Language/i18n';

export default class CustomNavBar2 extends Component<Props> {
	constructor(props){
		super(props);
    this.state={
      language: ''
    }
	}

  componentWillMount(){
    AsyncStorage.getItem('language').then( (value) => {
      this.setState({language: value})
    });
  }

  render() {
  	const tabNubmber = this.props.tabNubmber;
    const language = this.state.language;
    return (
      <View style={styles.container}>
      	<TouchableOpacity 
      		style={styles.imageView}
          onPress={Actions.pop}
          activeOpacity={0.9}
      	>
      		<Image 
      			source={require('../../assets/Images/Next.svg')}
      			style={
              language == "ar" ? styles.imageAR : styles.image
            }
      		/>
      	</TouchableOpacity>
        <View >
        {this.props.title ==='Forget Password'?
          <Text style={styles.headerText}>
            {i18n.t('forgetPassword')}
          </Text>
        :
          <Text style={styles.headerText}>
            {i18n.t('changePassword')}
          </Text>
        }
        </View>
      	<View/>
      </View>
    );
  }
}


