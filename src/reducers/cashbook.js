import createReducer from '../store/configureStore'
import * as types from '../actions/types'

export const cash = createReducer({}, {
  [types.GET_CASH_BOOK](state, action) {
    return {
      ...state,
      success: false,
      error: false,
      serverError: false,
      customerNameError: false,
      collectCashError: false,
      requestCashError: false,
      cashbook: action.payload.response
    }
  },
  [types.GET_CASH_BOOK_ERROR](state, action) {
    return {
      ...state,
      serverError: action.payload.error,
      cashbook: false
    }
  },
  [types.GET_CUSTOMER_NAME_SUCCESS](state, action) {

    return {
      ...state,
      success: false,
      error: false,
      serverError: false,
      customerNameError: false,
      collectCashError: false,
      requestCashError: false,
      customerName: action.payload.response
    }
  },
  [types.GET_CUSTOMER_NAME_ERROR](state, action) {
    return {
      ...state,
      customerNameError: action.payload.error,
      customerName: false
    }
  },
  [types.COLLECT_CASH_SUCCESS](state, action) {

    return {
      ...state,
      success: false,
      error: false,
      serverError: false,
      customerNameError: false,
      collectCashError: false,
      requestCashError: false,
      collectCash: action.payload.customerName
    }
  },
  [types.COLLECT_CASH_ERROR](state, action) {
    return {
      ...state,
      collectCashError: action.payload.error,
      collectCash: false
    }
  },
  [types.REQUEST_FOR_CASH_SUCCESS](state, action) {

    return {
      ...state,
      success: false,
      error: false,
      serverError: false,
      customerNameError: false,
      collectCashError: false,
      requestCashError: false,
      requestCash: action.payload.customerName
    }
  },
  [types.REQUEST_FOR_CASH_ERROR](state, action) {

    return {
      ...state,
      requestCashError: action.payload.error,
      requestCash: false
    }
  },
});
