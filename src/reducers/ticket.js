import createReducer from '../store/configureStore'
import * as types from '../actions/types'

export const ticket = createReducer({}, {
  [types.ACCEPT_TICKET_SUCCESS](state, action) {
    return {
      ...state,
      success: true,
      error: false,
      message: 'Successfull..',
      acceptTicket: action.payload.response,
    }
  },
  [types.ACCEPT_TICKET_ERROR](state, action) {
    return {
      ...state,
      success: false,
      error: true,
      serverError: action.payload.error
    }
  },
  [types.REFUSE_TICKET_SUCCESS](state, action) {
    return {
      ...state,
      success: true,
      error: false,
      message: 'Successfull..',
      refuseTicket: action.payload.response,
    }
  },
  [types.REFUSE_TICKET_ERROR](state, action) {
    return {
      ...state,
      success: false,
      error: true,
      serverError: action.payload.error
    }
  },
  [types.COMPLETE_TICKET_SUCCESS](state, action) {
    return {
      ...state,
      success: true,
      deleteImageError: false,
      message: 'Successfull..',
      completedTicketError: false,
      completedTicket: action.payload.response,
    }
  },
  [types.COMPLETE_TICKET_ERROR](state, action) {
    return {
      ...state,
      success: false,
      deleteImageError: true,
      completedTicket: false,
      completedTicketError: action.payload.error
    }
  },
  [types.DELETE_IMAGE_SUCCESS](state, action) {
    return {
      ...state,
      success: true,
      error: false,
      message: 'Successfull..',
      deleteImageError: false,
      deleteImage: action.payload.response,
    }
  },
  [types.DELETE_IMAGE_ERROR](state, action) {
    return {
      ...state,
      success: false,
      error: true,
      deleteImage: false,
      deleteImageError: action.payload.error
    }
  },
  [types.GET_REPORT_FIELDS_SUCCESS](state, action) {
  return {
    ...state,
    success: false,
    deleteImageError: false,
    serverError: false,
    deleteImage: false,
    reportFileds: action.payload.response
  }
},
  [types.GET_REPORT_FIELDS_ERROR](state, action) {
    return {
      ...state,
      success: false,
      deleteImageError: true,
      deleteImage:false,
      serverError: action.payload.error
    }
  },
  [types.SUBMIT_REPORT_SUCCESS](state, action) {
  return {
    ...state,
    success: false,
    error: false,
    serverError: false,
    deleteImage: false,
    reportSubmit: action.payload.response
  }
  },
  [types.SUBMIT_REPORT_ERROR](state, action) {
return {
  ...state,
  success: false,
  error: true,
  deleteImage: false,
  reportSubmitError: action.payload.error
}
},
  [types.TICKET_SETTING_SUCCESS](state, action) {
  return {
    ...state,
    success: false,
    error: false,
    serverError: false,
    ticketSetting: action.payload.response
  }
  },
  [types.TICKET_SETTING_ERROR](state, action) {
return {
...state,
success: false,
error: true,
ticketSetting: false,
serverError: action.payload.error
}
},
  [types.GET_TICKET_DETAILS](state, action) {
    return {
      ...state,
      success: false,
      error: false,
      serverError: false,
      ticket_detail: action.payload.response
    }
  },
});
