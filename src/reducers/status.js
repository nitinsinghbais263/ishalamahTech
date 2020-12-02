import createReducer from '../store/configureStore'
import * as types from '../actions/types'

export const status = createReducer({}, {
  [types.GET_TECHNICIAN_STATUS](state, action) {
    return {
      ...state,
      serverError: false,
      status: action.payload.response
    }
  },
  [types.GET_TECHNICIAN_STATUS_ERROR](state, action) {
    return {
      ...state,
      statusError: action.payload.error,
      status: false
    }
  }
});
