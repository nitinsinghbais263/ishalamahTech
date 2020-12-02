import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  Image,
  ImageBackground
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import i18n from '../../Language/i18n';
import styles from './Style';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';


export default class IntroScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: ''
    };
  }

  componentWillMount(){
    AsyncStorage.getItem('language').then( (value) => {
      this.setState({language: value})
    });
  }


  renderItems = (item) => {
    const language = this.state.language;
    return (
      <View style={styles.container}>
        <View style=
        { this.state.language == "ar" ? styles.backgroundImageViewAR : styles.backgroundImageView}
        >
          <Image
            source={item.item.backgroundImage}
            style={styles.backgroundImage}
          />
        </View>
        <Image
          style={item.item.imageStyle}
          source={item.item.image}
        />
        <Text style={item.item.titleStyle}>
          {item.item.title}
        </Text>
        <Text style={item.item.textStyle}>
          {item.item.text}
        </Text>
      </View>
    );
  }

  onDone = () => {
    this.setState({ show_Main_App: true });
    AsyncStorage.setItem('Intro', 'Alfarsi_Intro');
    Actions.replace('login');
  };

  onSkipSlides = () => {
    this.setState({ show_Main_App: true });
    AsyncStorage.setItem('Intro', 'Alfarsi_Intro');
    Actions.replace('login');
  };

  render() {
    const language = this.state.language;
      return (
        <AppIntroSlider
          renderItem={this.renderItems}
          language={language}
          slides={slides}
          onDone={this.onDone}
          showSkipButton={true}
          onSkip={this.onSkipSlides}
          dotStyle={{backgroundColor: '#285DB3'}}
          activeDotStyle={{backgroundColor:'#23BDE4'}}
          buttonTextStyle={{color: '#23BDE4'}}
        />
      );
  }
}

const slides = [

  {
    key: '1',
    title: i18n.t('SignUp'),
    text: i18n.t('Intro1'),
    image: require('../../assets/Images/Intro2.svg'),
    backgroundImage: require('../../assets/Images/LogoBg.svg'),
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: '#D500F9'
  },
  {
    key: '2',
    title: i18n.t('Redirect'),
    text: i18n.t('Intro3'),
    image: require('../../assets/Images/Intro3.svg'),
    backgroundImage: require('../../assets/Images/LogoBg.svg'),
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: '#2979FF'
  },
  {
    key: '3',
    title: i18n.t('Minutes'),
    text: i18n.t('Intro4'),
    image: require('../../assets/Images/Intro4.svg'),
    backgroundImage: require('../../assets/Images/LogoBg.svg'),
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: '#1DE9B6'
  },
  ];
