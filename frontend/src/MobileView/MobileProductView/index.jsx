/** @format */

import React, { useState, useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Truncate from 'react-truncate-html'
import Select from 'react-select'

import AsyncLoader from '../../components/AsyncLoader'
import { addToCart } from '../../redux/actions/cart'
import { siteConfig } from '../../components/Static/static'
import Slideshow from '../../components/Slider'
import Button from '../../components/Button'
import QuantityPicker from '../../components/QuantityPicker'
import { fetchPublicSingleProduct } from '../../redux/actions/products'
import './mobile-product-view.scss'

const MobileProductView = ({
  fetchPublicSingleProductFun,
  match,
  singleProductState,
  singleProductLoaderState,
  addToCartFun,
  addToCartProductsState,
}) => {
  const [activeSlider, setActiveSlider] = useState()
  const [activeArrowOffset, setActiveArrowOffset] = useState({ left: '67.583px' })
  const [tabActive, setTabActive] = useState('detail')
  const [cartItems, setCartItems] = useState([])
  const [itemQuantity, setItemQuantity] = useState(1)
  const [detectWholeSalePrice, setDetectWholeSalePrice] = useState(false)
  const [cartLoader, setCartLoader] = useState(false)
  const [wholeSaleIndex, setWholeIndex] = useState('')

  useMemo(() => {
    setActiveSlider(
      singleProductState &&
        singleProductState.product &&
        singleProductState.product.varient &&
        singleProductState.product.varient[0]
    )
  }, [singleProductState && singleProductState.product, cartItems])

  useEffect(() => {
    fetchPublicSingleProductFun(match.params.id)
    window.scrollTo(0, 0)
  }, [])

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

  let sliderImages =
    singleProductState && singleProductState.product && singleProductState.product.varient.length
      ? singleProductState &&
        singleProductState.product &&
        singleProductState.product.varient &&
        singleProductState.product.varient.map((item, index) => item.image.url)
      : singleProductState &&
        singleProductState.product &&
        singleProductState.product.images &&
        singleProductState.product.images.map((item, index) => item.url)

  const product = singleProductState && singleProductState.product

  const renderVarients =
    product !== undefined &&
    product &&
    product.varient &&
    product.varient.map((item) => ({ label: item.name, value: item.name, item }))

  console.log('@@ product', sliderImages)

  return (
    <>
      {singleProductLoaderState ? (
        <AsyncLoader />
      ) : (
        <>
          <div className="mobile-product-slider">
            <Slideshow
              showIndex={false}
              showArrows
              autoplay
              enableKeyboard
              useDotIndex
              slideInterval={5000}
              defaultIndex={0}
              slides={sliderImages}
              effect={'bottom'}
              height={'40%'}
              width={'100%'}
              mobile={true}
            />
          </div>

          <div className="mobile-product-info-container">
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
                lines={10}
                dangerouslySetInnerHTML={{
                  __html: product && product.description && product.description.substring(0, 500),
                }}
              />
            </div>

            <div className="product-whole-sale">
              <div className="product-table-header">
                <div className="product-table-align">
                  <div className="text-right">QUANTITY</div>
                  <div>PRICE (WHOLESALE DISCOUNT)</div>
                </div>
              </div>
              <div>
                {siteConfig.wholeSaleData.map((item, index) => (
                  <div
                    style={{
                      background: wholeSaleIndex === item.label ? '#F7AF3A' : null,
                      color: wholeSaleIndex === item.label ? '#fff' : null,
                    }}
                    className="product-table-align product-wholesale-item pl-1"
                    onClick={() => {
                      setDetectWholeSalePrice(true)
                      setWholeIndex(item.label)
                      product['price'] = item.price
                      setItemQuantity(item.value)
                    }}
                  >
                    <div
                      className="col-md-6 product-wholesale-label pl-1"
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
          <div className="mobile-info-column">
            <div className="lb-tab-wrapper" style={activeArrowOffset} />
            <div className="container">
              <div className="tab-container">
                <div
                  className={tabActive === 'detail' ? 'mr-4 active-title' : 'mr-4'}
                  onClick={() => {
                    setTabActive('detail')
                    setActiveArrowOffset({ left: '67.583px' })
                  }}
                >
                  Details
                </div>
                <div
                  className={tabActive === 'review' ? 'ml-4 active-title' : 'ml-4'}
                  onClick={() => {
                    setTabActive('review')
                    setActiveArrowOffset({ left: '179.583px' })
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
        </>
      )}
    </>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MobileProductView))
