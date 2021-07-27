/** @format */

import React from 'react'
import { withRouter } from 'react-router-dom'

import FutureProductCard from '../../components/FutureProductCard'
import './features-products.scss'

const DesktopFeaturesProducts = ({ history }) => {
  return (
    <div className="features-products-container">
      <div className="row">
        <div className="col-md-4">
          <FutureProductCard
            image="https://cdn.shopify.com/s/files/1/0505/5014/5221/products/cub40-Abstract_1024x1024@2x.jpg?v=1608468973"
            mainTitle="AAAVape CUB 40 MOD KIT"
            subTitle="Smooth and well-balanced."
            buttonText="AAAVape CUB"
            borderColor="#d49321"
            textColor="#d49321"
            callBack={() => history.push(`/product-detail/60f747727230b1121d877f6b`)}
          />
        </div>
        <div className="col-md-4">
          <FutureProductCard
            image="https://cdn.shopify.com/s/files/1/0505/5014/5221/products/BlackCrack_1024x1024@2x.png?v=1608722666"
            mainTitle="AAAVape Matrix Pod"
            subTitle="Rich and robust."
            buttonText="AAAVape Matrix"
            borderColor="#467A7B"
            textColor="#467A7B"
            callBack={() => history.push(`/product-detail/60f74ea69ac203135227b356`)}
          />
        </div>
        <div className="col-md-4">
          <FutureProductCard
            image="https://cdn.shopify.com/s/files/1/0505/5014/5221/products/BOOST-kit-STAINLESS_8394580e-8bd8-43b2-afdf-9c933f244804_1024x1024@2x.png?v=1608717181"
            mainTitle="AAAVape Boost Vape Pen"
            subTitle="Mellow, cool and crisp."
            buttonText="AAAVape Boost"
            borderColor="#846348"
            textColor="#846348"
            callBack={() => history.push(`/product-detail/60f851fe12615f04222a5bdf`)}
          />
        </div>
      </div>
    </div>
  )
}

export default withRouter(DesktopFeaturesProducts)
