import * as types from './types';
import ReactNative from 'react-native';
import {baseUrl} from '../constants/API';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';

export function createrRegistrationSuccess(response) {
  return {
    type: types.CREATE_REGITRATION_SUCCESS,
    payload: {
      response,
    },
  };
}

export function createRegistrationError(error) {
  return {
    type: types.CREATE_REGITRATION_ERROR,
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

export function registration(_this, data) {
  return function(dispatch) {
    var that = _this;
    fetch(`${baseUrl}/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: data.phone,
        // oneSignalPlayerId: _this.state.OneSignalId,
        type: 'technician',
        coordinate: {lat: 22.9512, lng: 75.11239},
      }),
    })
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.status == 'success') {
          AsyncStorage.setItem('USER_UUID', responseJSON.technician.user_uuid);
          Actions.registration3({data: data});
          dispatch(createrRegistrationSuccess(responseJSON.technician));
          // that.props.navigation.navigate('Registration3', {data: data});
        } else {
          dispatch(createRegistrationError(responseJSON.errors));
        }
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  };
}

export function codeVerificationSuccess(response) {
  return {
    type: types.OTP_VERIFICATION_SUCCESS,
    payload: {
      response,
    },
  };
}

export function codeVerificationError(error) {
  return {
    type: types.OTP_VERIFICATION_ERROR,
    payload: {
      error,
    },
  };
}

export function codeVerification(_this, data) {
  return function(dispatch) {
    var that = _this;
    fetch(`${baseUrl}/verify-phone`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: data.phone,
        otp: data.otp,
      }),
    })
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.status == 'success') {
          Actions.registration4({data: data});
          dispatch(codeVerificationSuccess(responseJSON.client));
          // that.props.navigation.navigate('registration4', {data: data});
        } else {
          dispatch(codeVerificationError(responseJSON));
        }
      })
      .catch(error => {
        Alert.alert(
          'Something went wrong. Please try again or contact support',
        );
      });
  };
}

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

export function createPasswordSuccess(response) {
  return {
    type: types.OTP_VERIFICATION_SUCCESS,
    payload: {
      response,
    },
  };
}

export function createPasswordError(error) {
  return {
    type: types.OTP_VERIFICATION_ERROR,
    payload: {
      error,
    },
  };
}

export function createPassword(_this, data) {
  const user_uuid = data.user_uuid;
  return function(dispatch) {
    var that = _this;

    fetch(`${baseUrl}/store-password`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: data.password,
        userUuid: data.user_uuid,
      }),
    })
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.status == 'success') {
          fetch(`${baseUrl}/login`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user: data.phone,
              password: data.password,
              timezone: 'Asia/Kolkata',
              coordinate: {lat: 22.9512, lng: 75.11239},
              type: 'technician',
            }),
          })
            .then(response => response.json())
            .then(responseJSON => {
              if (responseJSON.status == 'success') {
                AsyncStorage.setItem(
                  'TOKEN',
                  'Bearer ' + responseJSON.user.push_token,
                );

                // AsyncStorage.setItem('USER', responseJSON.user)
                AsyncStorage.setItem('USER_TECH', responseJSON.user.uuid);
                Actions.user({data: responseJSON.user});
                // that.props.navigation.navigate('UserProfile', {data: responseJSON.user});
                dispatch(createPasswordSuccess(responseJSON.user));
                dispatch(createLoginSuccess(responseJSON.user));
              } else {
                dispatch(createLoginError(responseJSON.error));
                dispatch(createPasswordError(responseJSON.error));
              }
            })
            .catch(error => {
              Alert.alert(
                'Something went wrong. Please try again or contact support',
              );
            });
        } else {
          dispatch(createPasswordError(responseJSON.error));
        }
      });
  };
}

export function forgetPasswordSuccess(response) {
  return {
    type: types.FORGET_PASSWORD_SUCCESS,
    payload: {
      response,
    },
  };
}

export function forgetPasswordError(error) {
  return {
    type: types.FORGET_PASSWORD_ERROR,
    payload: {
      error,
    },
  };
}

export function forgetPassword(data) {
  const user = data.user;
  return function(dispatch) {
    fetch(`${baseUrl}/forgot-password`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: data.user,
      }),
    })
      .then(response => response.json())
      .then(responseJSON => {
        debugger;
        if (responseJSON.status == 'success') {
          const data = {
            message: responseJSON.message,
            phone: user,
          };
          // Actions.forgetpassword2({user:user})
          dispatch(forgetPasswordSuccess(data));
        } else {
          dispatch(forgetPasswordError(responseJSON));
        }
      });
  };
}

export function resetPasswordSuccess(response) {
  return {
    type: types.RESET_PASSWORD_SUCCESS,
    payload: {
      response,
    },
  };
}

export function resetPasswordError(error) {
  return {
    type: types.RESET_PASSWORD_ERROR,
    payload: {
      error,
    },
  };
}

export function resetPassword(data) {
  const resBody = {
    user: data.user,
    otp: data.otp,
    password: data.password,
  };
  return function(dispatch) {
    fetch(`${baseUrl}/reset-password`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resBody),
    })
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.status == 'success') {
          dispatch(resetPasswordSuccess(responseJSON));
        } else {
          dispatch(resetPasswordError(responseJSON.errors[0]));
        }
      });
  };
}

export function resendOtpSuccess(response) {
  return {
    type: types.RESEND_OTP_VERIFICATION_SUCCESS,
    payload: {
      response,
    },
  };
}

export function resendOtpError(error) {
  return {
    type: types.RESEND_OTP_VERIFICATION_ERROR,
    payload: {
      error,
    },
  };
}

export function resendOtp(data) {
  return function(dispatch) {
    fetch(`${baseUrl}/resend-otp/${data.otp_to}/${data.otp_type}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJSON => {
        debugger;
        if (responseJSON.status == 'success') {
          dispatch(resendOtpSuccess(responseJSON));
        } else if (responseJSON.status == 'fail') {
          dispatch(resendOtpError(responseJSON));
        } else {
          alert('Something went wrong. Please try again or contact support');
        }
      })
      .catch(error => {
        dispatch(resendOtpError(error));
        alert('Something went wrong. Please try again or contact support');
      });
  };
}

export function verifyOtp(data) {
  return function(dispatch) {
    fetch(`${baseUrl}/verify-reset-password`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        otp: data.otp,
        user: data.user,
      }),
    })
      .then(response => response.json())
      .then(responseJSON => {
        debugger;
        if (responseJSON.status == 'success') {
          dispatch(verifyOtpSuccess(responseJSON));
        } else {
          dispatch(verifyOtpErrors(responseJSON));
        }
      })
      .catch(error => {
        dispatch(verifyOtpErrors(error.response));
      });
  };
}

export function verifyOtpSuccess(response) {
  return {
    type: types.VERIFY_OTP_SUCCESS,
    payload: {
      response,
    },
  };
}

export function verifyOtpErrors(error) {
  return {
    type: types.VERIFY_OTP_ERROR,
    payload: {
      error,
    },
  };
}
