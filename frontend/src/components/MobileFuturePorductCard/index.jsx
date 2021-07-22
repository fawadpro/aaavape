/** @format */

import React from 'react'

import './mobile-future-product.scss'

const MobileFutureProductCard = ({
  image,
  mainTitle,
  subTitle,
  buttonText,
  borderColor,
  textColor,
}) => {
  return (
    <div className="mobile-product-image-container">
      <img src={image} className="mobile-product-image-size" alt="product featured container" />
      <div className="mobile-product-title">{mainTitle}</div>
      <div className="mobile-product-sub-title">{subTitle}</div>
      <div
        className="mobile-product-button-container"
        style={{ border: `2px solid ${borderColor}`, color: textColor }}
      >
        {buttonText}
      </div>
    </div>
  )
}

export default MobileFutureProductCard
