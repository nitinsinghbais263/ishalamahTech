import createReducer from '../store/configureStore'
import * as types from '../actions/types'

export const jobs = createReducer({}, {
  [types.GET_PREVIOUS_JOBS](state, action) {
    return {
      ...state,
      serverError: false,
      previousJobs: action.payload.response
    }
  },
  [types.GET_PREVIOUS_JOBS_ERROR](state, action) {
    return {
      ...state,
      serverError: action.payload.error,
      previousJobs: false
    }
  },
  [types.GET_CURRENT_JOBS](state, action) {
    return {
      ...state,
      serverError: false,
      currentJobs: action.payload.response
    }
  },
  [types.GET_CURRENT_JOBS_ERROR](state, action) {
    return {
      ...state,
      currentJobsError: action.payload.error,
      previousJobs: false
    }
  },
  [types.GET_WAITING_TICKETS](state, action) {
    return {
      ...state,
      serverError: false,
      waitingTickets: action.payload.response
    }
  },
  [types.GET_WAITING_TICKETS_ERROR](state, action) {
    return {
      ...state,
      waitingTicketsError: action.payload.error,
      previousJobs: false
    }
  },
  [types.GET_USER_DATA](state, action) {
    return {
      ...state,
      serverError: false,
      userData: action.payload.response
    }
  },
});
