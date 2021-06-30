/** @format */

import React from 'react'

import AnimatedImage from '../../images/animated-dummy.gif'
import './promotion-product-style.scss'

const PromotionProduct = () => {
  return (
    <div className="promotion-product-container">
      <div className="wrapper">
        <div className="promotion-main-title">function that fits form</div>
        <div className="container-fluid">
          <div className="row text-center mt-4  edges-space">
            <div className="col-md-5 detail-info-container">
              <div className="detail-title-left" style={{ marginTop: 150 }}>
                GET MORE OUT OF YOUR VAPE
              </div>
              <p className="detail-description">Long-lasting pods and battery.</p>
            </div>
            <div className="col-md-2">
              <img src={AnimatedImage} alt="main" className="main-image-size" />
            </div>
            <div className="col-md-5 detail-info-container">
              <div>
                <div className="detail-title-right text-right">DESIGNED TO FIT YOU</div>
                <p className="detail-description text-right">7 Bold Colors 3 </p>
                <p className="detail-description text-right"> Premium Flavors 3</p>
                <p className="detail-description text-right"> Nicotine Levels</p>
              </div>

              <div style={{ marginTop: 130 }}>
                <div className="detail-title-right text-right">SIMPLE OPERATION</div>
                <p className="detail-description text-right">
                  Compact with a consistent, quiet draw{' '}
                </p>
              </div>
            </div>
          </div>

          <div className="button-container">
            <div className="button-style">View Detail</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PromotionProduct
