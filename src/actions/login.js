import * as types from './types';
import ReactNative from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Actions} from 'react-native-router-flux';
import {baseUrl} from '../constants/API';
import {Alert} from 'react-native';

export function createLoginSuccess(response) {
  return {
    type: types.CREATE_LOGIN_SUCCESS,
    payload: {
      response,
    },
  };
}

export function createLoginError(error) {
  return {
    type: types.CREATE_LOGIN_ERROR,
    payload: {
      error,
    },
  };
}

export function getinitialState() {
  return {
    type: types.GET_INITIAL_VALUE,
  };
}

export function login(_this, data) {
  return function(dispatch) {
    debugger
    dispatch(getinitialState());
    var that = _this;
    fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: data.phone,
        password: data.password,
        timezone: data.timezone,
        coordinate: data.coordinates,
        oneSignalPlayerId: data.oneSignalId,
        type: 'technician',
      }),
    })
      .then(response => response.json())
      .then(responseJSON => {
        debugger
        if (responseJSON.status == 'success') {
          AsyncStorage.setItem(
            'TOKEN',
            'Bearer ' + responseJSON.user.push_token,
          );
          AsyncStorage.setItem('USER_TECH', responseJSON.user.uuid);
          Actions.home();
          dispatch(createLoginSuccess(responseJSON.user));
        } else {
          dispatch(createLoginError(responseJSON));
        }
      })
      .catch(error => {
        debugger
        Alert.alert(
          'Something went wrong. Please try again or contact support',
        );
      });
  };
}
