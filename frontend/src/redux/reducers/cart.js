/** @format */

import * as actionTypes from '../actions/cart'

const Cart = (state = [], action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const productInCart = state.find((p) => p.product_id === action.data.product_id)
      if (!productInCart) return [...state, action.data]
      return state.map((p) => {
        return p
      })
    // case actionTypes.REMOVE_PRODUCT_FROM_CART:
    //   return [...state.slice(0, action.index), ...state.slice(action.index + 1)]
    default:
      return state
  }
}

export default Cart
