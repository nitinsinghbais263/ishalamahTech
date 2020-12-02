import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  I18nManager,
} from 'react-native';
import AppRoutes from './src/router/routes';
import * as RNLocalize from 'react-native-localize';
import i18n from './src/Language/i18n';
import AsyncStorage from '@react-native-community/async-storage';
import {Provider} from 'react-redux';
import {compose, createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducer from './src/reducers';
import OneSignal from 'react-native-onesignal';
import Geolocation from '@react-native-community/geolocation';

const loggerMiddleware = createLogger({
  predicate: (getState, action) => __DEV__,
});

function configureStore(initialState) {
  const enhancer = compose(applyMiddleware(thunkMiddleware, loggerMiddleware));
  return createStore(reducer, initialState, enhancer);
}
export const store = configureStore({});

export default class App extends Component<Props> {
  constructor(props) {
    
    super(props);
    this.state = {
      initial: '',
    };
    OneSignal.init('057a1455-6a2b-423c-87aa-661acc01e258');
    OneSignal.clearOneSignalNotifications();
    OneSignal.configure();
    OneSignal.enableVibrate(true);
    OneSignal.enableSound(true);
    OneSignal.inFocusDisplaying(2);
    this.onIds = this.onIds.bind(this);
  }

  componentWillMount() {
    AsyncStorage.getItem('language').then(value => {
      if (value) {
        i18n.locale = value;
      }
      if (value === 'ar') {
        I18nManager.forceRTL(true);
      } else {
        I18nManager.forceRTL(false);
      }
    });
    OneSignal.addEventListener('ids', this.onIds);
  }

  onIds(device) {
    AsyncStorage.setItem('OneSignalId', device.userId);
    
  }

  componentWillUnmount = () => {
    Geolocation.clearWatch(this.watchID);
  };

  render() {
    console.disableYellowBox = true;
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          {Platform.OS === 'ios' ? (
            <View
              style={{
                backgroundColor: '#2383c3',
                height: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight,
              }}>
              <StatusBar
                hidden={false}
                backgroundColor="#2383c3"
                barStyle="light-content"
                translucent={false}
              />
            </View>
          ) : null}
          <AppRoutes />
        </View>
      </Provider>
    );
  }
}
