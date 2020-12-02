import * as types from './types';
import {baseUrl} from '../constants/API';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';

export function getPreviousJobsSuccess(response){
  return {
    type: types.GET_PREVIOUS_JOBS,
    payload: {
      response
    }
  }
}

export function getPreviousJobsError(error){
  return {
    type: types.GET_PREVIOUS_JOBS_ERROR,
    payload: {
      error
    }
  }
}

export function getPreviousJobs( data )
{
  // const technicianUuid = data.state.uuid
  return function (dispatch) {
    fetch(`${baseUrl}/ticket?status=completed`, {
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
        dispatch(getPreviousJobsSuccess(responseJSON.tickets.data))
      }else{
        dispatch(getPreviousJobsError(responseJSON.message))
      }
    })
    .catch( (error) => {
      Alert.alert('Something went wrong. Please try again or contact support');
    });
  }
}

export function getCurrentJobsSuccess(response){
  return {
    type: types.GET_CURRENT_JOBS,
    payload: {
      response
    }
  }
}

export function getCurrentJobsError(error){
  return {
    type: types.GET_CURRENT_JOBS_ERROR,
    payload: {
      error
    }
  }
}

export function getCurrentJobs( data )
{
  // const technicianUuid = data.state.uuid
  return function (dispatch) {
    fetch(`${baseUrl}/ticket?status=in progress`, {
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
        dispatch(getCurrentJobsSuccess(responseJSON.tickets.data))
      }else if(responseJSON.message == "Unauthenticated."){
        Alert.alert("Your session is expired please login again");
        AsyncStorage.removeItem('TOKEN')
        Actions.login();
      }
      else{
        dispatch(getCurrentJobsError(responseJSON.message))
      }
    })
    .catch( (error) => {
      Alert.alert('Something went wrong. Please try again or contact support');
    });
  }
}

export function getWaitingTicketsSuccess(response){
  return {
    type: types.GET_WAITING_TICKETS,
    payload: {
      response
    }
  }
}

export function getWaitingTicketsError(error){
  return {
    type: types.GET_WAITING_TICKETS_ERROR,
    payload: {
      error
    }
  }
}

export function myWaitingTickets( data )
{
  // const technicianUuid = data.state.uuid
  return function (dispatch) {
    fetch(`${baseUrl}/my-waiting-ticket`, {
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
        dispatch(getWaitingTicketsSuccess(responseJSON.ticket))
      }else{
        dispatch(getWaitingTicketsError(responseJSON.message))
      }
    })
    .catch( (error) => {
      Alert.alert('Something went wrong. Please try again or contact support');
    });
  }
}

export function getUserDataSuccess(response){
  return {
    type: types.GET_USER_DATA,
    payload: {
      response
    }
  }
}


export function getUserData( token )
{
  // const technicianUuid = data.state.uuid
  return function (dispatch) {
    fetch(`${baseUrl}/get-user-profile`, {
      method: 'GET',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token
      },
    })
    .then(response => response.json())
    .then(responseJSON => {
      if(responseJSON.status == "success"){
        dispatch(getUserDataSuccess(responseJSON.user))
      }else if(responseJSON.message == "Unauthenticated."){
        Alert.alert("Your session is expired please login again");
        AsyncStorage.removeItem('TOKEN')
        Actions.login();
      }
      else{
        Alert.alert(responseJSON.message)
        // dispatch(getWaitingTicketsError(responseJSON.message))
      }
    })
    .catch( (error) => {
      Alert.alert('Something went wrong. Please try again or contact support');
    });
  }
}
