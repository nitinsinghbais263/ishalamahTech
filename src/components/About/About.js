import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  I18nManager,
  BackHandler,
} from 'react-native';
import styles from './Style';
import i18n from '../../Language/i18n';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import CustomHeader from '../ProfileDetails/CustomHeader.js';

export default class About extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    Actions.pop();
    return true;
  };

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <CustomHeader />
        </View>
        <StatusBar backgroundColor="#2383c3" barStyle="light-content" />
        <View style={styles.versionView}>
          <Text style={styles.versionText}>{i18n.t('version')}</Text>
        </View>
        <View style={styles.versionFiledView}>
          <Text style={styles.versionFieldText}>1.0.186</Text>
        </View>
      </View>
    );
  }
}
