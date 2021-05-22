/** @format */

import * as ActionTypes from '../actions/products'

const initialState = {}

const Products = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_ALL_PRODUCTS_LOADER:
      return {
        ...state,
        productLoader: action.data,
      }
    case ActionTypes.FETCH_ALL_PRODUCTS:
      return {
        ...state,
        products: action.data,
      }

    default:
      return {
        ...state,
      }
  }
}

export default Products
