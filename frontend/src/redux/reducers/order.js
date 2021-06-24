/** @format */

import * as ActionTypes from '../actions/order'

const initialState = {}

const Order = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_ALL_ORDERS:
      return {
        ...state,
        allOrders: action.data,
      }
    case ActionTypes.FETCH_ALL_ORDERS_LOADER:
      return {
        ...state,
        allOrderLoader: action.data,
      }
    case ActionTypes.FETCH_ALL_PENDING_ORDERS:
      return {
        pendingOrders: action.data,
      }
    case ActionTypes.FETCH_ALL_PENDING_ORDERS_LOADER:
      return {
        ...state,
        pendingOrdersLoader: action.data,
      }
    default: {
      return {
        ...state,
      }
    }
  }
}
export default Order
