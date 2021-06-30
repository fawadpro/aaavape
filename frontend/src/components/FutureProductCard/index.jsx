/** @format */

import React from 'react'

import './future-card.scss'

const FutureProductCard = ({ image, mainTitle, subTitle, buttonText, borderColor, textColor }) => {
  return (
    <div>
      <div className="product-image-container">
        <img src={image} className="product-image-size" alt="product featured container" />
        <div className="product-title">{mainTitle}</div>
        <div className="product-sub-title">{subTitle}</div>
        <div
          className="product-button-container"
          style={{ border: `2px solid ${borderColor}`, color: textColor }}
        >
          {buttonText}
        </div>
      </div>
    </div>
  )
}

export default FutureProductCard
