/** @format */

import React from 'react'

import './accessories-card.scss'

const AccessoriesCard = ({ imageURI }) => {
  return (
    <div className="accessories-card-container">
      <img src={imageURI} alt="imag 1" className="card-size" />
    </div>
  )
}

export default AccessoriesCard
