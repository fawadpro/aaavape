/** @format */

import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import * as ActionTypes from '../actions/user'
import User from './user'
import Order from './order'
import Products from './products'
import TopMenu from './topMenu'

const appReducer = combineReducers({
  form: formReducer,
  User,
  Order,
  Products,
  TopMenu,
})

export const rootReducer = (state, action) => {
  if (action.type === ActionTypes.USER_LOGOUT) {
    state = {}
  }

  return appReducer(state, action)
}
