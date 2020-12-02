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

export default class Header extends Component<Props> {
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
    const language = this.state.language;
    return (
      <View style={styles.imageContainer}>
      	<TouchableOpacity 
      		style={styles.imageView}
          onPress={Actions.pop}
          activeOpacity={0.9}
      	>
      		<Image 
      			source={require('../../assets/Images/Next.svg')}
      			style={
              language == "ar" ? styles.imageHeaderAR : styles.imageHeader
            }
      		/>
      	</TouchableOpacity>
      </View>
    );
  }
}


