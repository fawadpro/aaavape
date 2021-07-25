/** @format */

import axios from 'axios'
import config from '../../config'

export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGIN_LOADER = 'USER_LOGIN_LOADER'
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE'
export const CREATE_GENERAL_USER = 'CREATE_GENERAL_USER'
export const CREATE_GENERAL_USER_LOADER = 'CREATE_GENERAL_USER_LOADER'
export const USER_LOGOUT = 'USER_LOGOUT'

export const UserLogin = (data) => {
  return (dispatch) => {
    dispatch({ type: USER_LOGIN_LOADER, data: true })
    axios
      .post(`${config.apiPath}/api/v1/login`, data, { withCredentials: true })
      .then(function (response) {
        window.location.href = '/dashboard'
        dispatch({ type: USER_LOGIN_LOADER, data: false })
        return dispatch({ type: USER_LOGIN, data: response.data })
      })
      .catch(function (error) {
        dispatch({ type: USER_LOGIN_LOADER, data: false })
        return dispatch({ type: USER_LOGIN_FAILURE, error: error.response.data })
      })
  }
}

export const createGeneralUser = (data) => {
  return (dispatch) => {
    dispatch({ type: CREATE_GENERAL_USER_LOADER, data: true })
    axios.post(`${config.apiPath}/api/v1/register`, data).then((res) => {
      dispatch({ type: CREATE_GENERAL_USER_LOADER, data: false })
      return dispatch({ type: CREATE_GENERAL_USER, data: res.data })
    })
  }
}

export const LogoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem('user_agency_mgmt')
    return dispatch({ type: USER_LOGOUT })
  }
}
