/** @format */

import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Pagination from 'rc-pagination'

import Loader from '../../components/Loader'
import { siteConfig } from '../../components/Static/static'

import { fetchAllPendingOrders, fetchFilterOrders } from '../../redux/actions/order'
import PendingOrderInner from './pendingOrderInner'
import './pending-orders-style.scss'
import 'rc-pagination/assets/index.css'

const Order = ({
  fetchAllPendingOrderFun,
  pendingOrders,
  pendingOrdersLoader,
  fetchFilterOrderFun,
}) => {
  const [orderId, setOrderId] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (!orderId) {
      fetchAllPendingOrders()
    } else {
      const timeoutId = setTimeout(() => {
        fetchFilterOrderFun(orderId)
      }, 1000)
      return () => clearTimeout(timeoutId)
    }
  }, [orderId])

  const fetchAllPendingOrders = (pageSize) => {
    fetchAllPendingOrderFun(pageSize ? pageSize : page)
  }

  const handleQueryChange = (current) => {
    setPage(current)
    fetchAllPendingOrderFun(current)
  }

  return (
    <>
      {pendingOrdersLoader ? (
        <Loader title="Pending Orders" />
      ) : (
        <div className="order-container">
          <div className="row">
            <div className="order-main-title ml-3 mr-4">All Orders</div>

            <div className="col-md-5 push-to-button">
              <div className="search-filter-container">
                <div className="search-filter-pilar">
                  <span className="search-icon far fa-search"></span>
                  <input
                    type="search"
                    placeholder="Order ID"
                    className="search-input"
                    onChange={(e) => {
                      setOrderId(e.target.value)
                    }}
                    value={orderId}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="order-main-table">
            <div className="main-body mt-4">
              <table className="custom-table">
                <thead className="field-width">
                  {siteConfig.orderTableHead.map((item, index) => (
                    <>
                      <th
                        className={item.width === 'normal' ? 'width-normal' : 'width-normal'}
                        key={index}
                      >
                        {item.name}
                      </th>
                    </>
                  ))}
                </thead>
                {pendingOrders && pendingOrders.orders && pendingOrders.orders.length === 0 ? (
                  <div className="mt-4">No orders found</div>
                ) : (
                  <tbody>
                    {pendingOrders &&
                      pendingOrders.orders &&
                      pendingOrders.orders.map((item, index) => (
                        <PendingOrderInner key={index} item={item} />
                      ))}
                  </tbody>
                )}
              </table>
            </div>
            <div className="row">
              <div className="col-md-5 count-container">
                Showing
                <span className="count-color">
                  {(page - 1) * 10 + 1} -
                  {pendingOrders && pendingOrders.total >= page * 10
                    ? page * 10
                    : pendingOrders && pendingOrders.total}
                </span>
                / {pendingOrders && pendingOrders.total}
              </div>
              <div className="col-md-6 text-right pagination-container">
                <Pagination
                  className="ps-pagination "
                  showPrevNextJumpers={false}
                  hideOnSinglePage={true}
                  pageSize={10}
                  current={page}
                  onChange={handleQueryChange}
                  total={pendingOrders && pendingOrders.total}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllPendingOrderFun: (page) => dispatch(fetchAllPendingOrders(page)),
    fetchFilterOrderFun: (id) => dispatch(fetchFilterOrders(id)),
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    pendingOrders: state.Order.pendingOrders,
    pendingOrdersLoader: state.Order.pendingOrdersLoader,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)
