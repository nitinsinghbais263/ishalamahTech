import * as types from './types';
import ReactNative from 'react-native';
import {baseUrl} from '../constants/API';
import {Actions} from 'react-native-router-flux';

export function createNotesSuccess(response) {
  return {
    type: types.CREATE_NEW_NOTES,
    payload: {
      response,
    },
  };
}

export function createNotesError(error) {
  return {
    type: types.CREATE_NEW_NOTES_ERROR,
    payload: {
      error,
    },
  };
}

export function createNotes(_this, data) {
  return function(dispatch) {
    var that = _this;
    fetch(`${baseUrl}/ticket-notes`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'application/json',
        Authorization: data.token,
      },
      // body: JSON.stringify({
      //     ticketUuid: data.uuid,
      //     content: data.content,
      //     privacy: "public",
      //     attachments: data.attachements
      // })
      body: data.formData,
    })
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.status == 'success') {
          let data = responseJSON.ticket.notes;
          dispatch(createNotesSuccess(data));
          // that.props.navigation.navigate('TicketDetails', {data: data});
          // Actions._ticketView({data:data})
          Actions._ticketView({ticketDetails: responseJSON.ticket});
        } else if (responseJSON.status == 'fail') {
          alert(responseJSON.errors[0]);
          dispatch(createNotesError(responseJSON.errors));
        } else {
          alert('Something went wrong. Please try again or contact support');
        }
      })
      .catch(error => {
        alert('Something went wrong. Please try again or contact support');
      });
  };
}
