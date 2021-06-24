/** @format */

import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import * as ActionTypes from '../actions/user'
import User from './user'
import Order from './order'
import Products from './products'

const appReducer = combineReducers({
  form: formReducer,
  User,
  Order,
  Products,
})

export const rootReducer = (state, action) => {
  if (action.type === ActionTypes.USER_LOGOUT) {
    state = {}
  }

  return appReducer(state, action)
}
