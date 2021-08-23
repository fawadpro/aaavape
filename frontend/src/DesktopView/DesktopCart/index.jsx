/** @format */

import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { withRouter } from 'react-router-dom'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import _ from 'lodash'

import QuantityPicker from '../../components/QuantityPicker'
import { addToCart } from '../../redux/actions/cart'
import { createGeneralUser } from '../../redux/actions/user'
import { siteConfig } from '../../components/Static/static'
import CustomButton from '../../components/Button'
import './desktop-cart.scss'

const DesktopCart = ({ addToCartProductsState, createGeneralUserFun, history }) => {
  const [extractedCartItem, setExtractedCartItem] = useState('')
  const [itemQuantity, setItemQuantity] = useState('')
  const [customerToggle, setCustomerToggle] = useState(false)
  const [customerForm, setCustomerForm] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [customerCreationLoader, setCustomerCreationLoader] = useState(false)

  useEffect(() => {
    if (addToCartProductsState && addToCartProductsState.length > 0) {
      let extractedCartItemLocal = addToCartProductsState
      setExtractedCartItem(extractedCartItemLocal)
    } else {
      let productStringify = JSON.parse(localStorage.getItem('addToCart'))
      let extractedCartItemLocal = productStringify
      setExtractedCartItem(extractedCartItemLocal)
    }
  }, [])

  const toggleCustomer = () => {
    setCustomerToggle(!customerToggle)
  }

  const addCustomer = () => {
    setCustomerCreationLoader(true)
    const { name, email, password } = customerForm
    const data = {
      name,
      email,
      password,
      role: 'customer',
    }

    createGeneralUserFun(data)
    setTimeout(() => {
      setCustomerCreationLoader(false)
      history.push('/login')
    }, 1000)
  }

  const updateQuanity = (item, value, product_id) => {
    let index = _.findIndex(extractedCartItem, { product_id })

    extractedCartItem.splice(index, 1, {
      ...item,
      product_id,
      quantity: value,
    })

    localStorage.setItem('addToCart', JSON.stringify(extractedCartItem))

    setExtractedCartItem(extractedCartItem)
  }

  let total_amount = _.sumBy(extractedCartItem, function (item) {
    return item.quantity * item.price
  })

  const token = Cookies.get('aaavape_user')
  const userDetail = token !== undefined && jwt_decode(token)

  return (
    <div className="desktop-cart-container">
      {extractedCartItem && extractedCartItem.length > 0 ? (
        <>
          <div className="cart-title">SHOPPING CART</div>
          <div className="row">
            <div className="col-md-8">
              <div className="cart-table-container mb-2">
                <div className="row">
                  <div className="col-md-5">Product</div>
                  <div className="col-md-2">Price</div>
                  <div className="col-md-3">Qty</div>
                  <div className="col-md-2">Total</div>
                </div>
              </div>

              {extractedCartItem &&
                extractedCartItem.map((item, index) => (
                  <div className="row mt-2" key={index}>
                    <div className="col-md-5 cart-product-name justify-content-center align-self-center">
                      {item.name}
                    </div>
                    <div className="col-md-2 justify-content-center align-self-center">
                      $ {item.price}
                    </div>
                    <div className="col-md-3">
                      <QuantityPicker
                        min={1}
                        max={6000}
                        pickerOnchange={(value) => {
                          setItemQuantity(value)
                          updateQuanity(item, value, item && item.product_id)
                        }}
                        propsValue={item.quantity}
                      />
                    </div>
                    <div className="col-md-2 justify-content-center align-self-center">
                      $ {item.price * item.quantity}
                    </div>
                  </div>
                ))}
            </div>

            <div className="col-md-4">
              <div className="summery-container">
                <div className="summery-title-container">Summery</div>
                <div className="summery-products-container">
                  {extractedCartItem &&
                    extractedCartItem.map((item, index) => (
                      <div key={index} className="product-item">
                        {index + 1 + '. ' + item.name}
                      </div>
                    ))}
                </div>
                <hr />
                <div className="row summery-product-total">
                  <div className="col-md-5">Order Total</div>
                  <div className="col-md-7 text-right">$ {total_amount.toLocaleString()}</div>
                </div>
                <div
                  className="order-checkout"
                  onClick={() =>
                    userDetail === false ? setCustomerToggle(true) : history.push('/payment')
                  }
                >
                  Proceed to checkout
                </div>
              </div>
            </div>
            <Modal
              isOpen={customerToggle}
              toggle={toggleCustomer}
              className="general-content"
              size="lg"
              style={{ maxWidth: '1000px', width: '100%' }}
            >
              <ModalHeader>Checkout as a new Customer</ModalHeader>
              <ModalBody>
                <div className="row">
                  <div className="col-md-6 justify-content-center align-self-center">
                    <div className="form-field">
                      <div className="field-title mb-2">Name</div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        onChange={(e) => setCustomerForm({ ...customerForm, name: e.target.value })}
                      />
                    </div>

                    <div className="form-field mt-3">
                      <div className="field-title mb-2">Email</div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email Address"
                        onChange={(e) =>
                          setCustomerForm({ ...customerForm, email: e.target.value })
                        }
                      />
                    </div>

                    <div className="form-field mt-3">
                      <div className="field-title mb-2">Password</div>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        onChange={(e) =>
                          setCustomerForm({ ...customerForm, password: e.target.value })
                        }
                      />
                    </div>

                    <div className="mt-4">
                      <CustomButton
                        title="Create Account"
                        background={siteConfig.colors.buttonOrangeColor}
                        hoverBackground={siteConfig.colors.buttonOrangeColorHover}
                        type="button"
                        borderRadius={50}
                        padding={8}
                        callBack={() => addCustomer()}
                        loader={customerCreationLoader}
                      />
                      <span className="mr-2 ml-2">Or</span>
                      <CustomButton
                        title="Login"
                        background={siteConfig.colors.buttonOrangeColor}
                        hoverBackground={siteConfig.colors.buttonOrangeColorHover}
                        type="button"
                        borderRadius={50}
                        padding={8}
                        callBack={() => history.push('/login')}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 login-background">
                    <div className="login-title"> Checkout as a new customer </div>

                    <div className="mt-4 login-data">
                      Create an account for faster checkout, personalized offers, order tracking and
                      more.
                    </div>
                  </div>
                </div>
              </ModalBody>
            </Modal>
          </div>
        </>
      ) : (
        <div className="cart-title">CART IS EMPTY</div>
      )}
    </div>
  )
}

export const mapDispatchToProps = (dispatch) => {
  return {
    addToCartFun: (data) => dispatch(addToCart(data)),
    createGeneralUserFun: (data) => dispatch(createGeneralUser(data)),
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    addToCartProductsState: state.Cart,
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DesktopCart))
