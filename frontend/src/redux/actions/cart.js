/** @format */

export const ADD_TO_CART = 'ADD_TO_CART'

export const addToCart = (productArray) => {
  return (dispatch) => {
    dispatch({ type: ADD_TO_CART, data: productArray })
  }
}
