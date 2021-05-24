/** @format */

import React from 'react'

import './product-form-style.scss'
import ProductFormInner from './productFormInner'

const ProductForm = () => {
  return (
    <div className="product-form-container">
      <div className="product-route-container">
        <div className="back-to-route">
          <i className="fas fa-arrow-left"></i>
        </div>
        <div className="title">Add product</div>
      </div>

      <div className="form-inner-container">
        <ProductFormInner />
      </div>
    </div>
  )
}

export default ProductForm
