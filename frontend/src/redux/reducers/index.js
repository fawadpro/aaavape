/** @format */

import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import * as ActionTypes from '../actions/user'
import User from './user'

const appReducer = combineReducers({
  form: formReducer,
  User,
})

export const rootReducer = (state, action) => {
  if (action.type === ActionTypes.USER_LOGOUT) {
    state = {}
  }

  return appReducer(state, action)
}
