import React, {Component} from 'react';
import {View, Image, ImageBackground, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import SplashStyle from './style';
export default class SplashScreen extends Component {
  componentDidMount() {
    this._loadInitialState();
  }


  _loadInitialState = async () => {
    setTimeout(() => {
       this.checkAuth();
    }, 2000)
  }

  checkAuth = async()=>{
    const arr = await AsyncStorage.multiGet(['language','Intro','TOKEN']);
    if(!arr[0][1]){
      Actions.reset('selectLang');
    }
    else if(!arr[1][1]){
      Actions.reset('introScreen');
    }
    else if(!arr[2][1]){
      Actions.replace('login');
    }
    else{
      Actions.replace('home');
    }
  }



  render() {
    return (
      <View style={SplashStyle.Container}>
        <Image
          style={SplashStyle.Logo}
          source={require('../../assets/Images/Logo.svg')}
        />
        <Text style={SplashStyle.Text}>iSalamah</Text>
      </View>
    );
  }
}
