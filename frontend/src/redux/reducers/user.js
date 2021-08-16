/** @format */

import * as ActionTypes from '../actions/user'

const initialState = {}

const User = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.USER_LOGIN:
      return {
        ...state,
        userLogin: action.data,
      }
    case ActionTypes.USER_LOGIN_LOADER:
      return {
        ...state,
        userLoginLoader: action.data,
      }
    case ActionTypes.USER_LOGIN_FAILURE:
      return {
        ...state,
        userLogin: { status: 'fail', message: action.error },
      }
    case ActionTypes.USER_REGISTER_FAILURE:
      return {
        ...state,
        userRegisterFailure: { status: 'fail' },
      }
    case ActionTypes.USER_REGISTER:
      return {
        ...state,
        userRegister: action.data,
      }
    case ActionTypes.USER_REGISTER_LOADER:
      return {
        ...state,
        userRegisterLoader: action.data,
      }
    default:
      return {
        ...state,
      }
  }
}

export default User
