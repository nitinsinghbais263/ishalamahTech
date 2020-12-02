import * as types from './types';
import ReactNative from 'react-native';
import {baseUrl} from '../constants/API';
import { Alert } from 'react-native';

export function getTechStatusSuccess(response){
  return {
    type: types.GET_TECHNICIAN_STATUS,
    payload: {
      response
    }
  }
}

export function getTechStatusError(error){
  return {
    type: types.GET_TECHNICIAN_STATUS_ERROR,
    payload: {
      error
    }
  }
}

export function getTechStatus( data ) {
  return function (dispatch) {
    fetch(`${baseUrl}/technician-stats`, {
      method: 'GET',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: data.token
      },
    })
    .then(response => response.json())
    .then(responseJSON => {
      if(responseJSON.status == "success"){
        let data = responseJSON
        dispatch(getTechStatusSuccess(data))
      }else{
        dispatch(getTechStatusError(responseJSON.message))
      }
    })
    .catch( (error) => {
      Alert.alert('Something went wrong. Please try again or contact support');
    });
  }
}
