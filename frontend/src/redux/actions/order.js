/** @format */

import axios from 'axios'
import config from '../../config'

export const FETCH_ALL_ORDERS = 'FETCH_ALL_ORDERS'
export const FETCH_ALL_ORDERS_LOADER = 'FETCH_ALL_ORDERS_LOADER'
export const FETCH_ALL_ORDERS_FAILURE = 'FETCH_ALL_ORDERS_FAILURE'
export const FETCH_ALL_PENDING_ORDERS = 'FETCH_ALL_PENDING_ORDERS'
export const FETCH_ALL_PENDING_ORDERS_LOADER = 'FETCH_ALL_PENDING_ORDERS_LOADER'
export const FETCH_ALL_PENDING_ORDERS_FAILURE = 'FETCH_ALL_PENDING_ORDERS_FAILURE'

export const fetchOrders = (page) => {
  let endpoint = `${config.apiPath}/api/v1/admin/orders?page=` + page

  return (dispatch) => {
    dispatch({ type: FETCH_ALL_ORDERS_LOADER, data: true })
    axios
      .get(endpoint)
      .then(function (response) {
        dispatch({ type: FETCH_ALL_ORDERS_LOADER, data: false })

        return dispatch({ type: FETCH_ALL_ORDERS, data: response.data })
      })
      .catch(function (xhr, status, err) {
        return dispatch({ type: FETCH_ALL_ORDERS_FAILURE, data: xhr })
      })
  }
}

export const myOrder = (page) => {
  let endpoint = `${config.apiPath}/api/v1/order/me?page=` + page

  return (dispatch) => {
    dispatch({ type: FETCH_ALL_ORDERS_LOADER, data: true })
    axios
      .get(endpoint)
      .then(function (response) {
        dispatch({ type: FETCH_ALL_ORDERS_LOADER, data: false })

        return dispatch({ type: FETCH_ALL_ORDERS, data: response.data })
      })
      .catch(function (xhr, status, err) {
        return dispatch({ type: FETCH_ALL_ORDERS_FAILURE, data: xhr })
      })
  }
}

export const fetchAllPendingOrders = (page) => {
  let endpoint = `${config.apiPath}/api/v1/admin/orders?page=` + page + '&orderStatus=Processing'

  return (dispatch) => {
    dispatch({ type: FETCH_ALL_PENDING_ORDERS_LOADER, data: true })
    axios
      .get(endpoint)
      .then(function (response) {
        dispatch({ type: FETCH_ALL_PENDING_ORDERS_LOADER, data: false })

        return dispatch({ type: FETCH_ALL_PENDING_ORDERS, data: response.data })
      })
      .catch(function (xhr, status, err) {
        return dispatch({ type: FETCH_ALL_PENDING_ORDERS_FAILURE, data: xhr })
      })
  }
}

export const fetchFilterOrders = (id) => {
  var endpoint = `${config.apiPath}/api/v1/order/${id}`

  return (dispatch) => {
    dispatch({ type: FETCH_ALL_ORDERS_LOADER, data: true })
    axios
      .get(endpoint)
      .then(function (response) {
        dispatch({ type: FETCH_ALL_ORDERS_LOADER, data: false })

        return dispatch({ type: FETCH_ALL_ORDERS, data: response.data })
      })
      .catch(function (xhr, status, err) {
        return dispatch({ type: FETCH_ALL_ORDERS_FAILURE, data: xhr })
      })
  }
}
