/** @format */

import React, { useState, useEffect, useMemo } from 'react'
import Select from 'react-select'
import { connect } from 'react-redux'
import Truncate from 'react-truncate-html'
import { withRouter } from 'react-router-dom'

import { fetchPublicSingleProduct } from '../../redux/actions/products'
import { addToCart } from '../../redux/actions/cart'
import { siteConfig } from '../../components/Static/static'
import AsyncLoader from '../../components/AsyncLoader'
import Button from '../../components/Button'
import QuantityPicker from '../../components/QuantityPicker'
import './product-detail.scss'

const DesktopProductDetail = ({
  fetchPublicSingleProductFun,
  singleProductState,
  match,
  singleProductLoaderState,
  addToCartFun,
  addToCartProductsState,
}) => {
  const [activeSlider, setActiveSlider] = useState()
  const [activeArrowOffset, setActiveArrowOffset] = useState({ left: '356.583px' })
  const [tabActive, setTabActive] = useState('detail')
  const [cartItems, setCartItems] = useState([])
  const [itemQuantity, setItemQuantity] = useState(1)
  const [detectWholeSalePrice, setDetectWholeSalePrice] = useState(false)
  const [cartLoader, setCartLoader] = useState(false)
  const [wholeSaleIndex, setWholeIndex] = useState('')

  useEffect(() => {
    fetchPublicSingleProductFun(match.params.id)
    window.scrollTo(0, 0)
  }, [])

  useMemo(() => {
    setActiveSlider(
      singleProductState &&
        singleProductState.product &&
        singleProductState.product.varient &&
        singleProductState.product.varient[0]
    )
  }, [singleProductState && singleProductState.product, cartItems])

  const product = singleProductState && singleProductState.product

  const addProductsToCart = () => {
    setCartLoader(true)
    let productItem = {
      product_id: product._id,
      name: product.name,
      quantity: itemQuantity,
      price: detectWholeSalePrice
        ? product && product.price
        : product && product.price && product.price[0] && product.price[0].price,
    }

    addToCartFun(productItem)

    setTimeout(() => {
      window.scrollTo(0, 0)
      setCartLoader(false)
    }, 500)

    setCartItems([...cartItems, productItem])
  }

  const renderVarients =
    product &&
    product.varient &&
    product.varient.map((item) => ({ label: item.name, value: item.name, item }))

  let extractedCartItem = []

  if (addToCartProductsState && addToCartProductsState.length > 0) {
    extractedCartItem = addToCartProductsState
    localStorage.setItem('addToCart', JSON.stringify(extractedCartItem))
  } else {
    let productStringify = JSON.parse(localStorage.getItem('addToCart'))
    extractedCartItem = productStringify
  }

  console.log('@@ single', product)

  return singleProductLoaderState ? (
    <AsyncLoader />
  ) : (
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

              <div className="product-whole-sale">
                <div className="product-table-header">
                  <div className="row">
                    <div className="col-md-5 ml-4">QUANTITY</div>
                    <div className="col-md-6 text-right ml-3">PRICE (WHOLESALE DISCOUNT)</div>
                  </div>
                </div>
                <div>
                  {siteConfig.wholeSaleData.map((item, index) => (
                    <div
                      style={{
                        background: wholeSaleIndex === item.label ? '#F7AF3A' : null,
                        color: wholeSaleIndex === item.label ? '#fff' : null,
                      }}
                      className="row product-wholesale-item"
                      onClick={() => {
                        setDetectWholeSalePrice(true)
                        setWholeIndex(item.label)
                        product['price'] = item.price
                        setItemQuantity(item.value)
                      }}
                    >
                      <div
                        className="col-md-6 product-wholesale-label"
                        style={{ color: wholeSaleIndex === item.label ? '#fff' : null }}
                      >
                        {item.label}
                      </div>
                      <div className="col-md-6 text-right">${item.price}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="row product-info-add-to-cart mb-4">
                <div className="col-md-4 justify-content-center align-self-center">
                  <div className="mb-3 font-weight-bold">Quantity</div>
                  <QuantityPicker
                    min={1}
                    max={6000}
                    pickerOnchange={(value) => setItemQuantity(value)}
                    propsValue={itemQuantity}
                  />
                </div>
                <div className="col-md-5 add-to-cart">
                  <Button
                    title="Add To Cart"
                    background={siteConfig.colors.buttonOrangeColor}
                    hoverBackground={siteConfig.colors.buttonOrangeColorHover}
                    type="button"
                    borderRadius={50}
                    padding={8}
                    callBack={addProductsToCart}
                    loader={cartLoader}
                  />
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
    addToCartFun: (data) => dispatch(addToCart(data)),
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    singleProductState: state.Products.singleProduct,
    singleProductLoaderState: state.Products.productLoader,
    addToCartProductsState: state.Cart,
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DesktopProductDetail))
