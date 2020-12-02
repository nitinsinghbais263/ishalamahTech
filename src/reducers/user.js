import createReducer from '../store/configureStore'
import * as types from '../actions/types'

export const user = createReducer({}, {
  [types.GET_USER_DETAILS](state, action) {
    return {
      ...state,
      success: false,
      error: false,
      serverError: false,
      update_data: false,
      profile_pic: false,
      user: action.payload.response
    }
  },
  [types.UPADTE_USER_DETAILS](state, action) {
  
    return {
      ...state,
      success: false,
      updateError: false,
      serverError: false,
      update_data: action.payload.response
    }
  },
  [types.UPADTE_USER_DETAILS_ERROR](state, action) {
    return {
      ...state,
      update_data: false,
      updateError: action.payload.error
    }
  },
  [types.GET_COUNTRY](state, action) {
     
    return {
      ...state,
      success: false,
      error: false,
      serverError: false,
      countries: action.payload.response
    }
  },
  [types.GET_STATE](state, action) {
     
    return {
      ...state,
      success: false,
      error: false,
      serverError: false,
      states: action.payload.response
    }
  },
  [types.GET_CITY](state, action) {
     
    return {
      ...state,
      success: false,
      error: false,
      serverError: false,
      cities: action.payload.response
    }
  },
  [types.UPLOAD_PROFILE_PIC](state, action) {
    return {
      ...state,
      success: false,
      error: false,
      serverError: false,
      profile_pic: action.payload.response,
      user:false,
    }
  }

});
