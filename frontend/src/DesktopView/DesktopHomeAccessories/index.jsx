/** @format */

import React from 'react'

import AccessoriesCard from '../../components/AccessoriesCard'
import './desktop-home-accessories.scss'

const DesktopHomeAccessories = () => {
  return (
    <div className="home-accessories-container">
      <div className="home-accessories-title">
        <div className="header-title">WRAP YOUR ALTO IN PERSONALITY</div>

        <div className="accessories-container-grid">
          <div className="accessories-grid-item">
            <AccessoriesCard imageURI="https://cdn.shopify.com/s/files/1/0505/5014/5221/products/Crack-Black_1024x1024@2x.png?v=1606289623" />
          </div>
          <div className="accessories-grid-item">
            <AccessoriesCard imageURI="https://cdn.shopify.com/s/files/1/0505/5014/5221/products/Crack-Rose-Gold_1024x1024@2x.png?v=1606289644" />
          </div>
          <div className="accessories-grid-item">
            <AccessoriesCard imageURI="https://cdn.shopify.com/s/files/1/0505/5014/5221/products/Crack-Purple_b396d578-974c-407c-ac18-05cbc8c20f51_1024x1024@2x.png?v=1606289773" />
          </div>
          <div className="accessories-grid-item">
            <AccessoriesCard imageURI="https://cdn.shopify.com/s/files/1/0505/5014/5221/products/Crack-Red_f5798e45-d70e-4100-aa14-5927167a4ebd_1024x1024@2x.png?v=1606289772" />
          </div>
          <div className="accessories-grid-item">
            <AccessoriesCard imageURI="https://cdn.shopify.com/s/files/1/0505/5014/5221/products/Crack-Blue_453c0a55-bc14-4164-a2ed-9384388a5533_1024x1024@2x.png?v=1606289771" />
          </div>
        </div>
        <div className="button-container-revert mt-4">
          <div className="button-style">View Detail</div>
        </div>
      </div>
    </div>
  )
}

export default DesktopHomeAccessories
