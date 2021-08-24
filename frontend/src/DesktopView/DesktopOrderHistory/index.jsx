/** @format */

import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Pagination from 'rc-pagination'

import Loader from '../../components/Loader'
import { siteConfig } from '../../components/Static/static'

import { myOrder, fetchFilterOrders } from '../../redux/actions/order'
import DesktopOrderHistoryInner from './desktopOrderHistoryInner'
import './desktop-order-history.scss'
import 'rc-pagination/assets/index.css'

const OrderHistory = ({ fetchMyOrdersFun, allOrders, allOrderLoader, fetchFilterOrderFun }) => {
  const [orderId, setOrderId] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (!orderId) {
      fetchAllOrders()
    }
    const timeoutId = setTimeout(() => {
      if (orderId) {
        fetchFilterOrderFun(orderId)
      }
    }, 1000)
    return () => clearTimeout(timeoutId)
  }, [orderId])

  const fetchAllOrders = (pageSize) => {
    fetchMyOrdersFun(pageSize ? pageSize : page)
  }

  const handleQueryChange = (current) => {
    setPage(current)
    fetchMyOrdersFun(current)
  }

  return (
    <>
      {allOrderLoader ? (
        <Loader title="Orders" />
      ) : (
        <div className="order-container">
          <div className="row">
            <div className="order-main-title ml-3 mr-4">All Orders</div>
          </div>

          <div className="order-main-table">
            <div className="main-body mt-4">
              <table className="custom-table">
                <thead className="field-width">
                  {siteConfig.myOrderTableHead.map((item, index) => (
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
                {allOrders && allOrders.orders && allOrders.orders.length === 0 ? (
                  <div className="mt-4 pr-2 ml-4">No orders found</div>
                ) : (
                  <tbody>
                    {allOrders &&
                      allOrders.orders &&
                      allOrders.orders.map((item, index) => (
                        <DesktopOrderHistoryInner key={index} item={item} />
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
                  {allOrders && allOrders.total >= page * 10
                    ? page * 10
                    : allOrders && allOrders.total}
                </span>
                / {allOrders && allOrders.total}
              </div>
              <div className="col-md-6 text-right pagination-container">
                <Pagination
                  className="ps-pagination "
                  showPrevNextJumpers={false}
                  hideOnSinglePage={true}
                  pageSize={10}
                  current={page}
                  onChange={handleQueryChange}
                  total={allOrders && allOrders.total}
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
    fetchMyOrdersFun: (page) => dispatch(myOrder(page)),
    fetchFilterOrderFun: (id) => dispatch(fetchFilterOrders(id)),
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    allOrders: state.Order.allOrders,
    allOrderLoader: state.Order.allOrderLoader,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
