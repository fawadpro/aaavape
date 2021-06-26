/** @format */

import React, { useState } from 'react'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import EllipsisWithTooltip from 'react-ellipsis-with-tooltip'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import config from '../../config'

const OrderInner = ({
  item: { orderId, createdAt, price, status, images, _id },
  activeTab,
  history,
}) => {
  const [deleteToggleState, setDeleteToggleState] = useState(false)
  const [activateLoader, setActivateLoader] = useState(false)
  const [loader, setLoader] = useState(false)

  const deleteToggle = () => {
    setDeleteToggleState(!deleteToggleState)
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

  const activateProduct = (id) => {
    setActivateLoader(true)
    axios.put(`${config.apiPath}/api/v1/admin/product/${id}`).then((response) => {
      setActivateLoader(false)
      Swal.fire('Success', 'Product has been activated successfully', 'success')
      setTimeout(() => {
        window.location = '/product'
      }, 1000)
    })
  }

  return (
    <>
      <tr className="field-width">
        <td className="width-normal">
          <EllipsisWithTooltip placement="bottom">{orderId}</EllipsisWithTooltip>
        </td>
        <td className="width-normal">{moment(createdAt).format('YYYY-MM-DD')}</td>
        <td className="width-normal">Fawad Shah</td>
        <td className="width-normal">Pending</td>
        <td className="width-normal">$ 200</td>
        <td className="width-normal">
          {/* <span onClick={() => history.push(`/update-product/${_id}`)}>
            <i className="fal fa-edit" style={{ cursor: 'pointer' }}></i>
          </span> */}
          <span
            className="ml-2"
            onClick={() => {
              setDeleteToggleState(true)
            }}
          >
            <i className="fal fa-trash-alt" style={{ cursor: 'pointer' }}></i>
          </span>
        </td>
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
    </>
  )
}

export default withRouter(OrderInner)
