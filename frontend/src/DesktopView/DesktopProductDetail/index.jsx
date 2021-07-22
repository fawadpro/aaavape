/** @format */

import React, { useState, useEffect, useMemo } from 'react'
import Select from 'react-select'
import { connect } from 'react-redux'
import Truncate from 'react-truncate-html'
import { withRouter } from 'react-router-dom'

import { fetchPublicSingleProduct } from '../../redux/actions/products'
import { siteConfig } from '../../components/Static/static'
import Button from '../../components/Button'
import QuantityPicker from '../../components/QuantityPicker'
import './product-detail.scss'

const DesktopProductDetail = ({ fetchPublicSingleProductFun, singleProductState, match }) => {
  const [activeSlider, setActiveSlider] = useState()
  const [activeArrowOffset, setActiveArrowOffset] = useState({ left: '356.583px' })
  const [tabActive, setTabActive] = useState('detail')

  useEffect(() => {
    fetchPublicSingleProductFun(match.params.id)
  }, [])

  useMemo(() => {
    setActiveSlider(
      singleProductState &&
        singleProductState.product &&
        singleProductState.product.varient &&
        singleProductState.product.varient[0]
    )
  }, [singleProductState && singleProductState.product])

  const product = singleProductState && singleProductState.product
  const renderVarients =
    product &&
    product.varient &&
    product.varient.map((item) => ({ label: item.name, value: item.name, item }))

  console.log('@@ single', product)

  return (
    <div className="product-container">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="image-slider-container">
              <div className="product-image">
                <img
                  src={
                    singleProductState &&
                    singleProductState.product &&
                    singleProductState.product.varient &&
                    singleProductState.product.varient.length > 0
                      ? activeSlider && activeSlider.image && activeSlider.image.url
                      : singleProductState &&
                        singleProductState.product &&
                        singleProductState.product &&
                        singleProductState.product.images[0] &&
                        singleProductState.product.images[0].url
                  }
                  className="image-size"
                />
              </div>
              <div className="row slider-image-container">
                {product &&
                  product.varient &&
                  product.varient.map((item, index) => (
                    <div
                      onClick={() => setActiveSlider(item)}
                      className={
                        item === activeSlider
                          ? 'col-md-3 active-image-slider'
                          : 'col-md-3 none-active-image-slider'
                      }
                    >
                      <img
                        src={item && item.image && item.image.url}
                        key={index}
                        className="slider-image-size"
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="product-info-container">
              <div className="product-info-title">{product && product.name}</div>
              <div className="product-info-price">
                {singleProductState &&
                singleProductState.product &&
                singleProductState.product.varient &&
                singleProductState.product.varient.length > 0
                  ? `$ ${
                      activeSlider &&
                      activeSlider.price &&
                      activeSlider.price[0] &&
                      activeSlider.price[0].price
                    }`
                  : `$ ${product && product.price && product.price[0] && product.price[0].price}`}
              </div>
              <div className="product-info-status">In Stock</div>
              <div className="product-info-description">
                <Truncate
                  lines={6}
                  dangerouslySetInnerHTML={{
                    __html: product && product.description && product.description.substring(0, 500),
                  }}
                />
              </div>
              {product && product.varient && product.varient.length > 0 && (
                <div className="product-info-dropdown">
                  <div className="mb-2 mt-2 font-weight-bold">Varient</div>
                  <Select
                    options={renderVarients}
                    placeholder="Select Varient"
                    onChange={(value) => setActiveSlider(value.item)}
                  />
                </div>
              )}

              <div className="container">
                <div className="row product-info-add-to-cart">
                  <div className="col-md-4 justify-content-center align-self-center">
                    <div className="mb-3">Quantity</div>
                    <QuantityPicker min={1} max={4} />
                  </div>
                  <div className="col-md-5 add-to-cart">
                    <Button
                      title="Add To Cart"
                      background={siteConfig.colors.buttonOrangeColor}
                      hoverBackground={siteConfig.colors.buttonOrangeColorHover}
                      type="button"
                      borderRadius={50}
                      padding={8}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="info-column container">
        <div className="lb-tab-wrapper" style={activeArrowOffset} />
        <div className="container">
          <div className="tab-container">
            <div
              className={tabActive === 'detail' ? 'mr-4 active-title' : 'mr-4'}
              onClick={() => {
                setTabActive('detail')
                setActiveArrowOffset({ left: '356.583px' })
              }}
            >
              Details
            </div>
            <div
              className={tabActive === 'review' ? 'ml-4 active-title' : 'ml-4'}
              onClick={() => {
                setTabActive('review')
                setActiveArrowOffset({ left: '485.583px' })
              }}
            >
              Reviews
            </div>
          </div>

          <div className="main-content">
            {tabActive === 'detail' ? (
              <div dangerouslySetInnerHTML={{ __html: product && product.description }} />
            ) : (
              <p>Review section in progress</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export const mapDispatchToProps = (dispatch) => {
  return {
    fetchPublicSingleProductFun: (id) => dispatch(fetchPublicSingleProduct(id)),
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    singleProductState: state.Products.singleProduct,
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DesktopProductDetail))
