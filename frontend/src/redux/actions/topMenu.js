/** @format */

import axios from 'axios'
import config from '../../config'

export const FETCH_ALL_MENUS = 'FETCH_ALL_MENUS'
export const FETCH_ALL_MENUS_FAILURE = 'FETCH_ALL_MENUS_FAILURE'
export const TOGGLE_MOBILE_MENU = 'TOGGLE_MOBILE_MENU'

export const fetchMenus = () => {
  var endpoint = `${config.apiPath}/api/v1/top-menus`

  return (dispatch) => {
    axios
      .get(endpoint)
      .then(function (response) {
        return dispatch({ type: FETCH_ALL_MENUS, data: response.data.menuItem })
      })
      .catch(function (xhr, status, err) {
        return dispatch({ type: FETCH_ALL_MENUS_FAILURE, data: xhr })
      })
  }
}

export const toggleMobileMenu = (data) => {
  return (dispatch) => {
    return dispatch({ type: TOGGLE_MOBILE_MENU, data })
  }
}
