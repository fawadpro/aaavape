/** @format */

import React, { useState } from 'react'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import EllipsisWithTooltip from 'react-ellipsis-with-tooltip'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import config from '../../config'

const OrderHistoryInner = ({
  item: { orderId, createdAt, user, orderStatus, totalPrice, _id, orderItems },
}) => {
  const [deleteToggleState, setDeleteToggleState] = useState(false)
  const [delieveredToggleState, setDelieveredToggleState] = useState(false)
  const [showCartProducts, setShowCartProducts] = useState(false)
  const [loader, setLoader] = useState(false)

  const deleteToggle = () => {
    setDeleteToggleState(!deleteToggleState)
  }

  const delieveredToggle = () => {
    setDelieveredToggleState(!delieveredToggleState)
  }

  const cartProductsToggle = () => {
    setShowCartProducts(!showCartProducts)
  }

  const deleteProduct = (id) => {
    setLoader(true)

    axios.delete(`${config.apiPath}/api/v1/admin/product/${id}`).then((response) => {
      setLoader(false)
      Swal.fire('Success', 'Product has been deleted successfully', 'success')
      setTimeout(() => {
        window.location = '/product'
      }, 800)
    })
  }

  const updateOrder = (id) => {
    setLoader(true)

    axios
      .put(`${config.apiPath}/api/v1/admin/update-order-status/${id}`, { orderStatus: 'Delivered' })
      .then((response) => {
        setLoader(false)
        Swal.fire('Success', 'Order status marked as delivered successfully', 'success')
        setTimeout(() => {
          window.location = '/order'
        }, 800)
      })
  }

  return (
    <>
      <tr className="field-width">
        <td className="width-normal">
          <EllipsisWithTooltip placement="bottom">{orderId}</EllipsisWithTooltip>
        </td>
        <td className="width-normal">{moment(createdAt).format('YYYY-MM-DD')}</td>
        <td className="width-normal">{user && user.name}</td>
        <td
          className="width-normal"
          style={{ color: orderStatus === 'Delivered' ? 'green' : '#30a6e8', fontWeight: 'bold' }}
        >
          {orderStatus}
        </td>
        <td className="width-normal">$ {Math.round(totalPrice)}</td>
      </tr>

      <Modal isOpen={deleteToggleState} toggle={deleteToggle} className="general-content">
        <ModalHeader>Deactivate Product </ModalHeader>
        <ModalBody>
          <p>Do you really want to delete this product ? This process cannot be undone</p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            onClick={() => {
              setDeleteToggleState(false)
            }}
          >
            Cancel
          </Button>
          <Button color="danger" onClick={() => deleteProduct(_id)}>
            {loader ? <i className={`fa fa-circle-o-notch fa-spin`}></i> : 'Delete'}
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={delieveredToggleState} toggle={delieveredToggle} className="general-content">
        <ModalHeader>Delivered Order </ModalHeader>
        <ModalBody>
          <p>Do you really want to marks as delivered this order? This process cannot be undone</p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            onClick={() => {
              setDelieveredToggleState(false)
            }}
          >
            Cancel
          </Button>
          <Button color="success" onClick={() => updateOrder(_id)}>
            {loader ? <i className={`fa fa-circle-o-notch fa-spin`}></i> : 'Delivered'}
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={showCartProducts} toggle={cartProductsToggle} className="general-content">
        <ModalHeader toggle={cartProductsToggle}>Cart Products</ModalHeader>
        <ModalBody>
          {orderItems &&
            orderItems.map((item, index) => (
              <>
                <div className="mb-2">
                  <div className="products-name">
                    {index + 1}.<span className="ml-2">{item.name}</span>
                  </div>
                  <div className="product-cart-price">$ {item.price}</div>
                </div>
                <hr />
              </>
            ))}
        </ModalBody>
      </Modal>
    </>
  )
}

export default withRouter(OrderHistoryInner)
