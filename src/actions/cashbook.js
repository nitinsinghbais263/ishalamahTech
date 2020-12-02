import * as types from './types';
import ReactNative from 'react-native';
import {baseUrl} from '../constants/API';
import {Actions} from 'react-native-router-flux';

export function getCashBookSuccess(response) {
  return {
    type: types.GET_CASH_BOOK,
    payload: {
      response,
    },
  };
}

export function getCashBookError(error) {
  return {
    type: types.GET_CASH_BOOK_ERROR,
    payload: {
      error,
    },
  };
}

export function getCashBook(data) {
  const search = data.search ? data.search : '';
  return function(dispatch) {
    fetch(
      `${baseUrl}/cash?moduleName=${'technician'}&status=${
        data.categoryStatus
      }&searchTerm=${search}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: data.token,
        },
      },
    )
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.status == 'success') {
          dispatch(getCashBookSuccess(responseJSON));
        } else if (responseJSON.status == 'fail') {
          // alert(responseJSON.message)
          dispatch(getCashBookError(responseJSON.message));
        } else {
          alert('Something went wrong. Please try again or contact support');
        }
      })
      .catch(error => {
        alert('Something went wrong. Please try again or contact support');
      });
  };
}

export function requestCashSuccess(response) {
  return {
    type: types.REQUEST_FOR_CASH_SUCCESS,
    payload: {
      response,
    },
  };
}

export function requestCashError(error) {
  return {
    type: types.REQUEST_FOR_CASH_ERROR,
    payload: {
      error,
    },
  };
}

export function requestCash(_this, data) {
  return function(dispatch) {
    var that = _this;

    fetch(`${baseUrl}/cash`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: data.token,
      },
      body: JSON.stringify({
        clientUuid: data.clientUuid,
        amount: data.amount,
      }),
    })
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.status == 'success') {
          dispatch(requestCashSuccess(responseJSON));
        } else {
          dispatch(requestCashError(responseJSON));
        }
      })
      .catch(error => {
        Alert.alert(
          'Something went wrong. Please try again or contact support',
        );
      });
  };
}

export function getCollectCashSuccess(response) {
  return {
    type: types.COLLECT_CASH_SUCCESS,
    payload: {
      response,
    },
  };
}

export function getCollectCashError(error) {
  return {
    type: types.COLLECT_CASH_ERROR,
    payload: {
      error,
    },
  };
}

export function getCollectCash(_this, data) {
  return function(dispatch) {
    var that = _this;

    fetch(`${baseUrl}/cash/${data.cashUuid}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: data.token,
      },
      body: JSON.stringify({
        confirmationCode: data.code,
      }),
    })
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.status == 'success') {
          dispatch(getCollectCashSuccess(responseJSON));
          // that.props.navigation.navigate('Dashboard');
        } else {
          dispatch(getCollectCashError(responseJSON));
        }
      })
      .catch(error => {
        Alert.alert(
          'Something went wrong. Please try again or contact support',
        );
      });
  };
}

export function getCustomerNameSuccess(response) {
  return {
    type: types.GET_CUSTOMER_NAME_SUCCESS,
    payload: {
      response,
    },
  };
}

export function getCustomerNameError(error) {
  return {
    type: types.GET_CUSTOMER_NAME_ERROR,
    payload: {
      error,
    },
  };
}

export function getCustomerName(data) {
  return function(dispatch) {
    fetch(`${baseUrl}/client?searchTerm=${data.state.search}&all=1`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: data.state.token,
      },
    })
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.status == 'success') {
          let data = responseJSON;
          dispatch(getCustomerNameSuccess(responseJSON.client));
        } else if (responseJSON.status == 'fail') {
          dispatch(getCustomerNameError(responseJSON.message));
        } else {
          alert('Something went wrong. Please try again or contact support');
        }
      })
      .catch(error => {
        alert('Something went wrong. Please try again or contact support');
      });
  };
}
