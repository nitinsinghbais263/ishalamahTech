import * as types from './types';
import AsyncStorage from '@react-native-community/async-storage';
import {Actions} from 'react-native-router-flux';
import {baseUrl} from '../constants/API';
import {Alert} from 'react-native';

export function refuseTicketSuccess(response) {
  return {
    type: types.REFUSE_TICKET_SUCCESS,
    payload: {
      response,
    },
  };
}

export function refuseTicketError(error) {
  return {
    type: types.REFUSE_TICKET_ERROR,
    payload: {
      error,
    },
  };
}

export function refuseTicket(_this, data) {
  return function(dispatch) {
    var that = _this;
    fetch(`${baseUrl}/ticket-acknowledge/${data.uuid}/denied`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: data.token,
      },
      body: JSON.stringify({
        reason: data.reason,
      }),
    })
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.status == 'success') {
          Actions.home();
          dispatch(refuseTicketSuccess(responseJSON));
        } else {
          dispatch(refuseTicketError(responseJSON));
        }
      })
      .catch(error => {
        Alert.alert(
          'Something went wrong. Please try again or contact support',
        );
      });
  };
}

export function acceptTicketSuccess(response) {
  return {
    type: types.ACCEPT_TICKET_SUCCESS,
    payload: {
      response,
    },
  };
}

export function acceptTicketError(error) {
  return {
    type: types.ACCEPT_TICKET_ERROR,
    payload: {
      error,
    },
  };
}

export function acceptTicket(_this, data) {
  return function(dispatch) {
    var that = _this;
    fetch(`${baseUrl}/ticket-acknowledge/${data.uuid}/accepted`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: data.token,
      },
      body: JSON.stringify({
        reason: data.reason,
      }),
    })
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.status == 'success') {
          Actions._ticketView({ticketDetails: data.ticketDetail});
          dispatch(acceptTicketSuccess(responseJSON));
        } else {
          dispatch(acceptTicketError(responseJSON));
        }
      })
      .catch(error => {
        Alert.alert(
          'Something went wrong. Please try again or contact support',
        );
      });
  };
}

export function getReportFieldsSuccess(response) {
  return {
    type: types.GET_REPORT_FIELDS_SUCCESS,
    payload: {
      response,
    },
  };
}

export function getReportFieldsError(error) {
  return {
    type: types.GET_REPORT_FIELDS_ERROR,
    payload: {
      error,
    },
  };
}

// export function getReportFields(data) {
//   return function (dispatch) {
//     fetch(`${baseUrl}/maintenance-client/${data.state.mcuuid}`, {
//       method: 'GET',
//       headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//           Authorization: data.state.token
//       },
//     })
//     .then(response => response.json())
//     .then(responseJSON => {
//       if(responseJSON.status == "success"){

//         let data = responseJSON
//         dispatch(getReportFieldsSuccess(responseJSON.maintenance_client))
//       } else if(responseJSON.status == "fail"){
//         alert(responseJSON.error)
//         dispatch(getReportFieldsError(responseJSON.error))
//       }else{
//         alert("Something went wrong. Please try again or contact support")
//       }
//     })
//     .catch( (error) => {
//       alert("Something went wrong. Please try again or contact support")
//     });
//   }
// }

export function getReportFields(data) {
  return function(dispatch) {
    fetch(`${baseUrl}/service-visit-report/${data.state.uuid}`, {
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
          dispatch(getReportFieldsSuccess(responseJSON.report));
        } else if (responseJSON.status == 'fail') {
          alert(responseJSON.error);
          dispatch(getReportFieldsError(responseJSON.error));
        } else {
          alert('Something went wrong. Please try again or contact support');
        }
      })
      .catch(error => {
        alert('Something went wrong. Please try again or contact support');
      });
  };
}

export function submitReportSuccess(response) {
  return {
    type: types.SUBMIT_REPORT_SUCCESS,
    payload: {
      response,
    },
  };
}

export function submitReportError(error) {
  return {
    type: types.SUBMIT_REPORT_ERROR,
    payload: {
      error,
    },
  };
}

export function submitReport(_this, data) {
  return function(dispatch) {
    var that = _this;
    fetch(`${baseUrl}/report`, {
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
          Actions.ticketView();
          dispatch(submitReportSuccess(responseJSON.report));
        } else {
          dispatch(submitReportError(responseJSON));
        }
      })
      .catch(error => {
        Alert.alert(
          'Something went wrong. Please try again or contact support',
        );
      });
  };
}

export function deleteImgSuccess(response) {
  return {
    type: types.DELETE_IMAGE_SUCCESS,
    payload: {
      response,
    },
  };
}

export function deleteImgError(error) {
  return {
    type: types.DELETE_IMAGE_ERROR,
    payload: {
      error,
    },
  };
}

export function deleteServerImg(token, uuid) {
  return function(dispatch) {
    fetch(`${baseUrl}/file-delete/${uuid}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then(response => {
        if (response.status == 204) {
          dispatch(deleteImgSuccess(response.status));
        } else {
          dispatch(deleteImgError(response));
        }
      })
      .catch(error => {
        Alert.alert(
          'Something went wrong. Please try again or contact support',
        );
      });
  };
}

export function ticketSettingSuccess(response) {
  return {
    type: types.TICKET_SETTING_SUCCESS,
    payload: {
      response,
    },
  };
}

export function ticketSettingError(error) {
  return {
    type: types.TICKET_SETTING_ERROR,
    payload: {
      error,
    },
  };
}

export function ticketSettings(data) {
  return function(dispatch) {
    fetch(`${baseUrl}/technician/${data.uuid}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: data.token,
      },
      body: JSON.stringify({
        acceptTicket: data.acceptTicket,
      }),
    })
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.status == 'success') {
          dispatch(ticketSettingSuccess(responseJSON));
        } else {
          dispatch(ticketSettingError(responseJSON.error));
        }
      })
      .catch(error => {
        Alert.alert(
          'Something went wrong. Please try again or contact support',
        );
      });
  };
}

export function getTicketDetailSuccess(response) {
  return {
    type: types.GET_TICKET_DETAILS,
    payload: {
      response,
    },
  };
}

export function getTicketDetailError(error) {
  return {
    type: types.GET_TICKET_DETAILS_ERROR,
    payload: {
      error,
    },
  };
}

export function getTicketDetail(data) {
  return function(dispatch) {
    fetch(`${baseUrl}/ticket/${data.state.waitingTickets.uuid}`, {
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
          dispatch(getTicketDetailSuccess(responseJSON.ticket));
        } else if (responseJSON.status == 'fail') {
          dispatch(getTicketDetailError(responseJSON.error));
        }
      })
      .catch(error => {
        alert('Something went wrong. Please try again or contact support');
      });
  };
}

export function completeTicketSuccess(response) {
  return {
    type: types.COMPLETE_TICKET_SUCCESS,
    payload: {
      response,
    },
  };
}

export function completeTicketError(error) {
  return {
    type: types.COMPLETE_TICKET_ERROR,
    payload: {
      error,
    },
  };
}

export function completeTicket(token, uuid, status, otp) {
  return function(dispatch) {
    fetch(`${baseUrl}/ticket/${uuid}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        status: status,
        confirmationOtp: otp,
      }),
    })
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.status == 'success') {
          dispatch(completeTicketSuccess(responseJSON));
          if (responseJSON.ticket.status == 'completed') {
            Actions.thankYou();
          }

          // that.props.navigation.navigate('Dashboard');
        } else {
          Alert.alert(responseJSON.message);
          dispatch(completeTicketError(responseJSON));
        }
      })
      .catch(error => {
        Alert.alert(
          'Something went wrong. Please try again or contact support',
        );
      });
  };
}
