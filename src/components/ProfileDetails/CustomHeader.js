import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import i18n from '../../Language/i18n';
import { getAdjustedFontSize } from '../../Responsive/fontResponsive.js';
import AsyncStorage from '@react-native-community/async-storage';

export default class CustomHeader extends Component {
	constructor(props){
    super(props)
    this.state={}

  }

  componentWillMount(){
		AsyncStorage.getItem('language').then( (value) => {
			this.setState({
				language: value
			})
		})
	}

	render(){
		return(
			<View>
        <View style={styles.container}>
          <View style={{justifyContent: 'center',}}>
            <View style={{flexDirection: 'row',}}>
              {this.props.settingScreen ?
                  <TouchableOpacity
                    onPress={()=> this.props.oneStep? Actions.ticketView() : Actions.home()}
                    style={{flexDirection: 'row'}}
                    activeOpacity={0.8}
                  >
                  <Image
                    source={require('../../assets/Images/Next.svg')}
                    style={{...styles.image,transform: [{rotate: i18n.locale==='ar'? '0deg': '180deg'}]}}
                    resizeMode = 'contain'
                  />
                </TouchableOpacity>
              :
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
            }
            </View>
          </View>
        </View>
    	</View>
		)
	}
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingRight: 10,
  },
  image:{
    //transform:  [{ rotate: '0deg': '180deg' }],
    marginLeft: 10
  },
})
