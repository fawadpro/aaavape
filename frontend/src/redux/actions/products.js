/** @format */

import axios from 'axios'
import config from '../../config'

export const FETCH_ALL_PRODUCTS = 'FETCH_ALL_PRODUCTS'
export const FETCH_ALL_PRODUCTS_LOADER = 'FETCH_ALL_PRODUCTS_LOADER'
export const FETCH_ALL_PRODUCTS_FAILURE = 'FETCH_ALL_PRODUCTS_FAILURE'

export const fetchProducts = (page) => {
  var endpoint = `${config.apiPath}/api/v1/admin/products?page=` + page

  return (dispatch) => {
    dispatch({ type: FETCH_ALL_PRODUCTS_LOADER, data: true })
    axios
      .get(endpoint)
      .then(function (response) {
        dispatch({ type: FETCH_ALL_PRODUCTS_LOADER, data: false })

        return dispatch({ type: FETCH_ALL_PRODUCTS, data: response.data })
      })
      .catch(function (xhr, status, err) {
        return dispatch({ type: FETCH_ALL_PRODUCTS_FAILURE, data: xhr })
      })
  }
}
