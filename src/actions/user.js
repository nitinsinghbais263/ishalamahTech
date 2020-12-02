import * as types from './types';
import ReactNative from 'react-native';
import {baseUrl} from '../constants/API';
import {Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';

export function getUserDetailsSuccess(response) {
  return {
    type: types.GET_USER_DETAILS,
    payload: {
      response,
    },
  };
}

export function getUserDetailsError(error) {
  return {
    type: types.GET_USER_DETAILS,
    payload: {
      error,
    },
  };
}

export function getUserDetails(data) {
  return function(dispatch) {
    fetch(`${baseUrl}/get-user-profile`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: data.state.token,
      },
    })
      .then(response => response.json())
      .then(responseJSON => {
        if (
          responseJSON.message == 'Token Expired' ||
          responseJSON.message == 'Unauthenticated.'
        ) {
          Alert.alert(responseJSON.message);
          AsyncStorage.removeItem('TOKEN').then(function(value) {
            Actions.splash();
          });
        } else if (responseJSON.status == 'success') {
          dispatch(getUserDetailsSuccess(responseJSON.user));
        } else {
          Alert.alert(responseJSON.errors[0]);
          dispatch(getUserDetailsError(responseJSON.errors[0]));
        }
      })
      .catch(error => {
        Alert.alert(
          'Something went wrong. Please try again or contact support',
        );
      });
  };
}

export function updateUserDetailsSuccess(response) {
  return {
    type: types.UPADTE_USER_DETAILS,
    payload: {
      response,
    },
  };
}

export function updateUserDetailsError(error) {
  return {
    type: types.UPADTE_USER_DETAILS_ERROR,
    payload: {
      error,
    },
  };
}

export function updateUserDetails(_this, data) {
  return function(dispatch) {
    var that = _this;
    fetch(`${baseUrl}/profile-detail-update`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: data.token,
      },
      body: JSON.stringify({
        fullName: data.fullname,
        address1: data.address1,
        address2: data.address2,
        city: data.city_name,
        state: data.state_name,
        country: data.country_name,
        zipCode: data.zip_code,
        email: data.email,
        currentPassword: data.currentPassword,
      }),
    })
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.status == 'success') {
          dispatch(updateUserDetailsSuccess(responseJSON));
        } else {
          dispatch(updateUserDetailsError(responseJSON));
        }
      })
      .catch(error => {
        Alert.alert(
          'Something went wrong. Please try again or contact support',
        );
      });
  };
}

export function getCountrySuccess(response) {
  return {
    type: types.GET_COUNTRY,
    payload: {
      response,
    },
  };
}

export function getCountryError(error) {
  return {
    type: types.GET_COUNTRY,
    payload: {
      error,
    },
  };
}

export function getCountry(_this, data) {
  return function(dispatch) {
    var that = _this;
    fetch(`${baseUrl}/countries`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: data.token,
      },
    })
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.status == 'success') {
          let countries = responseJSON.countries;
          dispatch(getCountrySuccess(countries));
        } else {
          dispatch(getCountryError(responseJSON.error));
        }
      })
      .catch(error => {
        Alert.alert(
          'Something went wrong. Please try again or contact support',
        );
      });
  };
}

export function getStateSuccess(response) {
  return {
    type: types.GET_STATE,
    payload: {
      response,
    },
  };
}

export function getStateError(error) {
  return {
    type: types.GET_STATE_Error,
    payload: {
      error,
    },
  };
}

export function getState(_this, data) {
  const countryId = data.countryId;
  return function(dispatch) {
    var that = _this;
    fetch(`${baseUrl}/states/${countryId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: data.token,
      },
    })
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.status == 'success') {
          let states = responseJSON.states;
          dispatch(getStateSuccess(states));
        } else {
          dispatch(getStateError(responseJSON.error));
        }
      })
      .catch(error => {
        Alert.alert(
          'Something went wrong. Please try again or contact support',
        );
      });
  };
}

export function getCitySuccess(response) {
  return {
    type: types.GET_CITY,
    payload: {
      response,
    },
  };
}

export function getCityError(error) {
  return {
    type: types.GET_CITY_Error,
    payload: {
      error,
    },
  };
}

export function getCity(_this, data) {
  const stateId = data.stateId;
  return function(dispatch) {
    var that = _this;
    fetch(`${baseUrl}/cities/${stateId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: data.token,
      },
    })
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.status == 'success') {
          let cities = responseJSON.cities;
          dispatch(getCitySuccess(cities));
        } else {
          dispatch(getCityError(responseJSON.error));
        }
      })
      .catch(error => {
        Alert.alert(
          'Something went wrong. Please try again or contact support',
        );
      });
  };
}

export function uploadProfileSuccess(response) {
  return {
    type: types.UPLOAD_PROFILE_PIC,
    payload: {
      response,
    },
  };
}

export function uploadProfileError(error) {
  return {
    type: types.UPLOAD_PROFILE_PIC_ERROR,
    payload: {
      error,
    },
  };
}

export function uploadProfile(_this, data) {
  return function(dispatch) {
    var that = _this;
    fetch(`${baseUrl}/upload-profile-image`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'application/json',
        Authorization: data.token,
      },
      body: data.formData,
    })
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.status == 'success') {
          let profile = responseJSON;
          dispatch(uploadProfileSuccess(profile));
        } else if (responseJSON.status == 'fail') {
          alert(responseJSON.message);
          dispatch(uploadProfileError(responseJSON.error));
        } else {
          alert(
            'Something went wrong. Please try again or contact support user3',
          );
        }
      })
      .catch(error => {
        alert(error);
      });
  };
}
