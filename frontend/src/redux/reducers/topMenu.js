/** @format */

import * as ActionTypes from '../actions/topMenu'

const initialState = {}

const TopMenu = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_ALL_MENUS:
      return {
        ...state,
        topMenus: action.data,
      }
    case ActionTypes.TOGGLE_MOBILE_MENU:
      return {
        ...state,
        toggleMobileState: action.data,
      }
    default:
      return {
        ...state,
      }
  }
}

export default TopMenu
