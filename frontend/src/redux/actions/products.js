/** @format */

import axios from 'axios'
import config from '../../config'

export const FETCH_ALL_PRODUCTS = 'FETCH_ALL_PRODUCTS'
export const FETCH_ALL_PRODUCTS_LOADER = 'FETCH_ALL_PRODUCTS_LOADER'
export const FETCH_ALL_PRODUCTS_FAILURE = 'FETCH_ALL_PRODUCTS_FAILURE'
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const ADD_PRODUCT_LOADER = 'ADD_PRODUCT_LOADER'
export const ADD_PRODUCT_FAILURE = 'ADD_PRODUCT_FAILURE'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const FETCH_FILTER_PRODUCT_LOADER = 'FETCH_FILTER_PRODUCT_LOADER'

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

export const fetchFilterProduct = (name) => {
  var endpoint = `${config.apiPath}/api/v1/admin/products?keyword=${name}`

  return (dispatch) => {
    dispatch({ type: FETCH_ALL_PRODUCTS_LOADER, data: true })
    dispatch({ type: FETCH_FILTER_PRODUCT_LOADER, data: true })
    axios
      .get(endpoint)
      .then(function (response) {
        dispatch({ type: FETCH_ALL_PRODUCTS_LOADER, data: false })
        dispatch({ type: FETCH_FILTER_PRODUCT_LOADER, data: false })

        return dispatch({ type: FETCH_ALL_PRODUCTS, data: response.data })
      })
      .catch(function (xhr, status, err) {
        return dispatch({ type: FETCH_ALL_PRODUCTS_FAILURE, data: xhr })
      })
  }
}

export const fetchFilterDeletedProducts = (name) => {
  var endpoint = `${config.apiPath}/api/v1/admin/deleted-products?keyword=${name}`

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

export const fetchDeleteProducts = (page) => {
  var endpoint = `${config.apiPath}/api/v1/admin/deleted-products?page=` + page

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

export const addProduct = (data) => {
  return (dispatch) => {
    dispatch({ type: ADD_PRODUCT_LOADER, data: true })
    axios
      .post(`${config.apiPath}/api/v1/admin/new-product`, data)
      .then(function (response) {
        window.location.href = '/product'
        dispatch({ type: ADD_PRODUCT_LOADER, data: false })

        return dispatch({ type: ADD_PRODUCT, data: response.data })
      })
      .catch(function (xhr, status, err) {
        return dispatch({ type: ADD_PRODUCT_FAILURE, data: xhr })
      })
  }
}

export const updateProduct = (data, id) => {
  return (dispatch) => {
    dispatch({ type: ADD_PRODUCT_LOADER, data: true })
    axios
      .put(`${config.apiPath}/api/v1/admin/update-product/${id}`, data)
      .then(function (response) {
        window.location.href = '/product'
        dispatch({ type: ADD_PRODUCT_LOADER, data: false })

        return dispatch({ type: UPDATE_PRODUCT, data: response.data })
      })
      .catch(function (xhr, status, err) {
        return dispatch({ type: ADD_PRODUCT_FAILURE, data: xhr })
      })
  }
}
