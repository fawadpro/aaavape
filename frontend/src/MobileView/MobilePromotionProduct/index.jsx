/** @format */

import React, { useState } from 'react'

import { siteConfig } from '../../components/Static/static'
import AnimatedImage from '../../images/animated.gif'
import './mobile-promotion-product.scss'

const delay = 4500

const MobilePromotionProduct = () => {
  const [index, setIndex] = React.useState(0)
  const timeoutRef = React.useRef(null)

  const promotion = siteConfig.promotion

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  React.useEffect(() => {
    resetTimeout()
    timeoutRef.current = setTimeout(
      () => setIndex((prevIndex) => (prevIndex === promotion.length - 1 ? 0 : prevIndex + 1)),
      delay
    )

    return () => {
      resetTimeout()
    }
  }, [index])

  return (
    <div className="mobile-promotion-product-container">
      <div className="promotion-title">FUNCTION THAT FITS FORM</div>
      <img src={AnimatedImage} alt="main" className="image-gif" />

      <div className="promotion-slider">
        <div
          className="slideshowSlider"
          style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
        >
          {promotion.map((item, index) => (
            <div className="slide-item" key={index}>
              <div className="slider-item-title">{item.name}</div>
              {item.description.map((internalItem, index) => (
                <div className="slider-item-description">{internalItem.name}</div>
              ))}
            </div>
          ))}
        </div>

        <div className="slideshowDots">
          {promotion.map((_, idx) => (
            <div
              key={idx}
              className={`slideshowDot${index === idx ? ' active' : ''}`}
              onClick={() => {
                setIndex(idx)
              }}
            ></div>
          ))}
        </div>
      </div>

      <div class="button-container">
        <div class="button-style">View Detail</div>
      </div>
    </div>
  )
}

export default MobilePromotionProduct
