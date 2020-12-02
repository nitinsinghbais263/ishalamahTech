import createReducer from '../store/configureStore';
import * as types from '../actions/types';

export const registration = createReducer(
  {},
  {
    [types.GET_INITIAL_VALUE](state, action) {
      return {
        ...state,
        success: false,
        error: false,
        serverError: false,
        data: false,
        resetServerError: false,
        resetData: false,
        forgetServerError: false,
        forgetData: false,
      };
    },
    [types.CREATE_REGITRATION_SUCCESS](state, action) {
      return {
        ...state,
        message: 'Successfull..',
        data: action.payload.response,
        serverError: false,
      };
    },
    [types.CREATE_REGITRATION_ERROR](state, action) {
      return {
        ...state,
        serverError: action.payload.error,
      };
    },
    [types.OTP_VERIFICATION_SUCCESS](state, action) {
      return {
        ...state,
        message: 'Successfull..',
        verifyCode: action.payload.response,
        otpCodeError: false,
      };
    },
    [types.OTP_VERIFICATION_ERROR](state, action) {
      return {
        ...state,
        success: false,
        error: true,
        otpCodeError: action.payload.error,
        verifyCode: false,
      };
    },

    [types.RESEND_OTP_VERIFICATION_SUCCESS](state, action) {
      return {
        ...state,
        message: 'Successfull..',
        resendCode: action.payload.response,
        resendOtpCodeError: false,
      };
    },
    [types.RESEND_OTP_VERIFICATION_ERROR](state, action) {
      return {
        ...state,
        success: false,
        error: true,
        resendOtpCodeError: action.payload.error,
        resendCode: false,
      };
    },

    [types.FORGET_PASSWORD_SUCCESS](state, action) {
      return {
        ...state,
        message: 'Successfull..',
        forgetData: action.payload.response,
        forgetServerError: false,
      };
    },
    [types.FORGET_PASSWORD_ERROR](state, action) {
      return {
        ...state,
        success: false,
        error: true,
        forgetServerError: action.payload.error,
        forgetData: false,
      };
    },
    [types.RESET_PASSWORD_SUCCESS](state, action) {
      return {
        ...state,
        message: 'Successfull..',
        resetData: action.payload.response,
        resetServerError: false,
      };
    },
    [types.RESET_PASSWORD_ERROR](state, action) {
      return {
        ...state,
        success: false,
        error: true,
        resetServerError: action.payload.error,
        resetData: false,
      };
    },
    [types.VERIFY_OTP_SUCCESS](state, action) {
      return {
        ...state,
        message: 'Successfull..',
        verifyOtpData: action.payload.response,
        verifyOtpError: false,
      };
    },
    [types.VERIFY_OTP_ERROR](state, action) {
      return {
        ...state,
        success: false,
        error: true,
        verifyOtpError: action.payload.error,
        verifyOtpData: false,
      };
    },
  },
);
