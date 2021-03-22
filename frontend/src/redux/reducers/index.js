import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import * as ActionTypes from "../actions/user";

const appReducer = combineReducers({
  form: formReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === ActionTypes.USER_LOGOUT) {
    state = {};
  }

  return appReducer(state, action);
};
