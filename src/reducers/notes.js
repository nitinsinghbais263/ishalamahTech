import createReducer from '../store/configureStore'
import * as types from '../actions/types'

export const notes = createReducer({}, {
  [types.CREATE_NEW_NOTES](state, action) {

    return {
      ...state,
      success: false,
      error: false,
      serverError: false,
      notes: action.payload.response
    }
  }
});
