import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import i18n from '../../Language/i18n';
import RNRestart from 'react-native-restart';
import styles from './Style';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';

export default class SelectLang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: ''
    }
  }

  selectEN = async () => {
    this.setState({
      checkedEN: true,
      checkedAR: false
    })
    await AsyncStorage.setItem('language', 'en');
    i18n.locale = 'en'

    if (I18nManager.isRTL) {
      RNRestart.Restart();
    } else {
      RNRestart.Restart();
    }
    I18nManager.forceRTL(false);
  }

  selectAR = async() => {
    this.setState({
      checkedEN: false,
      checkedAR: true
    })
    await  AsyncStorage.setItem('language', 'ar');
    i18n.locale = 'ar'
    if (!I18nManager.isRTL) {
      RNRestart.Restart();
    }
    I18nManager.forceRTL(true);
  }

  componentWillMount(){
		AsyncStorage.getItem('language').then( (value) => {
      this.setState({language: value})
    });
	}

  render() {
    const language = this.state.language;
    return (
      <View style={styles.container}>
        <View style={
          language == "ar" ? styles.backgroundImageViewAR : styles.backgroundImageView}
        >
          <Image
            source={require('../../assets/Images/LogoBg.svg')}
            style={styles.backgroundImage}
          />
        </View>
        <View style={styles.topImage}>
          <Image
            style={styles.image}
            source={require('../../assets/Images/Lang.svg')}
          />
        </View>
        <View style={styles.bottom}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.rigthImage}
          onPress={() => this.selectEN()}
        >
          <View style={styles.englishView}>
            <View style={styles.englishTextView}>
              <Text style={styles.continueText}>
                Continue in
              </Text>
              <Text style={styles.englishText}>
                English
              </Text>
              <Text style={styles.englishContent}>
                You can always change the language preferences from the account settings.
              </Text>
            </View>
            <View style={styles.englishbuttonView}>

                <Image
                  style={[
                    {resizeMode: 'contain'},
                    {transform: language == "ar" ?
                      [{ rotate: '180deg' }] :
                      [{ rotate: '0deg' }]
                    }
                  ]}
                  source={require('../../assets/Images/LangRight.svg')}
                />

            </View>
          </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => this.selectAR()}
            style={styles.rigthImage}
          >
          <View style={styles.arabicView}>
            <View style={styles.arabicTextView}>
              <Text style={styles.continueTextAR}>
                المتابعة باللغة
              </Text>
              <Text style={styles.arabicText}>
                العربية
              </Text>
              <Text style={styles.arabicContent}>
                يمكنك تغيير اللغة في أي وقت من خلال خصائص الحساب من الإعدادات
              </Text>
            </View>
            <View style={styles.englishbuttonView}>

                <Image
                  style={[
                    {resizeMode: 'contain'},
                    {transform: language == "ar" ?
                      [{ rotate: '180deg' }] :
                      [{ rotate: '0deg' }]
                    }
                  ]}
                  source={require('../../assets/Images/LangRight.svg')}
                />

            </View>
          </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
