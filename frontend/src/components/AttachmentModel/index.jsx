/** @format */

import React from 'react'
import './attachedModalDetail.scss'

const AttachedModalDetail = ({ item, removeData, planUrl }) => {
  return (
    <div className="image-container">
      <div className="remove-icon">
        <i className="fa fa-close" aria-hidden="true" onClick={() => removeData()} />
      </div>
      <img src={item.url ? item.url : URL.createObjectURL(item)} alt="url" className="image-size" />
    </div>
  )
}

export default AttachedModalDetail
