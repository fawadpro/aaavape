/** @format */

import React from 'react'
import './attachedModalDetail.scss'

const AttachedModalDetail = ({ item, removeData }) => {
  return (
    <div className="attached-main-container">
      <div className="attached-main-body">
        <div className="attached-body-content">{item.name}</div>
        <div className="attached-header-close" onClick={() => removeData(item.name)}>
          X
        </div>
      </div>
    </div>
  )
}

export default AttachedModalDetail
