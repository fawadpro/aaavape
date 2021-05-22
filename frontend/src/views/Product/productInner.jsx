/** @format */

import React from 'react'
import moment from 'moment'

const ProductInner = ({ item: { name, createdAt, price, status, images } }) => {
  return (
    <tr className="field-width">
      <td className="width-normal">
        {name}
        <span className="image-view-container">
          <img src={images && images[0].url} alt="Profile" className="image" />
        </span>
      </td>
      <td className="width-normal">{price}</td>
      <td className="width-normal">{status}</td>
      <td className="width-normal">{moment(createdAt).format('YYYY-MM-DD')}</td>
      <td className="width-normal">
        <span>
          <i className="fal fa-edit"></i>
        </span>
        <span className="ml-2">
          <i className="fal fa-trash-alt"></i>
        </span>
      </td>
    </tr>
  )
}

export default ProductInner
