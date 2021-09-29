/** @format */

import React, { useState, useEffect } from 'react'
import CreditCardInput from 'react-credit-card-input'

import jwt_decode from 'jwt-decode'
import Cookies from 'js-cookie'
import _ from 'lodash'
import Swal from 'sweetalert2'
import { connect } from 'react-redux'
import axios from 'axios'
import apiConfig from '../../config'
import Select from 'react-select'

import { siteConfig } from '../../components/Static/static'
import CustomButton from '../../components/Button'
import CreditCard from '../../images/credit-card.jpg'
import './payment-style.scss'

const Payment = ({ history, addToCartProductsState }) => {
  const [extractedCartItem, setExtractedCartItem] = useState('')
  const [orderLoader, setOrderLoader] = useState(false)
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: 'Demo',
    phoneNo: '',
    postalCode: '',
    country: '',
  })
  const [paymentInformation, setPaymentInformation] = useState({
    cc: '',
    cvv: '',
    expiry: '',
  })

  const token = Cookies.get('aaavape_user')
  const userDetail = token !== undefined && jwt_decode(token)

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

  let total_amount = _.sumBy(extractedCartItem, function (item) {
    return item.quantity * item.price
  })

  let expiryMask = paymentInformation.expiry.replace(/\//g, '')

  total_amount = Math.ceil(total_amount)

  const paymentData = {
    amount: total_amount.toString(),
    cc: paymentInformation.cc.replace(/\s/g, ''),
    cvv: paymentInformation.cvv,
    expire: expiryMask.replace(/\s/g, ''),
  }

  let createOrder = {
    totalPrice: total_amount,
    orderItems: extractedCartItem,
    shippingInfo: {
      address: shippingAddress.address,
      city: shippingAddress.city,
      phoneNo: shippingAddress.phoneNo,
      postalCode: shippingAddress.postalCode,
      country: shippingAddress.country,
    },
    paymentInfo: {
      id: '',
      status: '',
    },
    user: userDetail && userDetail.id,
  }

  const submitHandler = async () => {
    setOrderLoader(true)
    let res
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    res = await axios
      .post(`${apiConfig.apiPath}/api/v1/payment/processnew`, paymentData, config)
      .then((res) => {
        if (res.data.hasOwnProperty('success')) {
          createOrder.paymentInfo = {
            id: res.data.id,
            status: 'Pending',
          }

          axios.post(`${apiConfig.apiPath}/api/v1/new-order`, createOrder).then((res) => {
            Swal.fire('Success !', 'Order has been placed successfully', 'success')
            localStorage.removeItem('addToCart')
            setOrderLoader(false)
            setTimeout(() => {
              history.push('/')
            }, 1000)
          })
        } else {
          Swal.fire('Error !', 'There is some issue while payment processing', 'error')
        }
      })
  }

  //   const clientSecret = res.data.client_secret

  //   console.log(clientSecret)

  //   if (!stripe || !elements) {
  //     return
  //   }

  //   const result = await stripe.confirmCardPayment(clientSecret, {
  //     payment_method: {
  //       cc: elements.getElement(CardNumberElement),
  //       billing_details: {
  //         name: userDetail && userDetail.name,
  //         email: userDetail && userDetail.email,
  //       },
  //     },
  //   })

  //   if (result.error) {
  //     Swal.fire('Error !', 'Something went wrong', 'error')
  //   } else {
  //     if (result.paymentIntent.status === 'succeeded') {
  //       createOrder.paymentInfo = {
  //         id: result.paymentIntent.id,
  //         status: result.paymentIntent.status,
  //       }

  //       axios.post(`${apiConfig.apiPath}/api/v1/new-order`, createOrder).then((res) => {
  //         Swal.fire('Success !', 'Order has been placed successfully', 'success')
  //         localStorage.removeItem('addToCart')
  //         setOrderLoader(false)
  //         setTimeout(() => {
  //           history.push('/')
  //         }, 1000)
  //       })
  //     } else {
  //       Swal.fire('Error !', 'There is some issue while payment processing', 'error')
  //     }
  //   }
  // } catch (error) {
  //   Swal.fire('Error !', 'There is some issue while payment processing', 'error')
  // }

  return (
    <div className="credit-card-container">
      <div className="image-section">
        <img src={CreditCard} className="credit-card-image" />
      </div>
      <div className="credit-card-section">
        <div className="main-container">
          <div className="payment-detail-title">Payment Details</div>
          <div>Complete your purchase by providing your payment details</div>
          <hr />
          <CreditCardInput
            cardNumberInputProps={{
              value: paymentInformation.cc,
              onChange: (e) =>
                setPaymentInformation({
                  ...paymentInformation,
                  cc: e.target.value,
                }),
            }}
            cardExpiryInputProps={{
              value: paymentInformation.expiry,
              onChange: (e) =>
                setPaymentInformation({
                  ...paymentInformation,
                  expiry: e.target.value,
                }),
            }}
            cardCVCInputProps={{
              value: paymentInformation.cvv,
              onChange: (e) =>
                setPaymentInformation({
                  ...paymentInformation,
                  cvv: e.target.value,
                }),
            }}
            fieldClassName="input"
          />

          <hr />
          <div className="payment-detail-title">Billing Address</div>

          <div className="form-field mt-4 mb-3">
            <div className="field-title mb-2">Address</div>
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
            />
          </div>

          <div className="form-field mt-4 mb-3">
            <div className="field-title mb-2">Phone No</div>
            <input
              type="text"
              className="form-control"
              placeholder="Phone No"
              onChange={(e) => setShippingAddress({ ...shippingAddress, phoneNo: e.target.value })}
            />
          </div>

          <div className="form-field mt-4 mb-3">
            <div className="field-title mb-2">Postal Code</div>
            <input
              type="text"
              className="form-control"
              placeholder="Postal Code"
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, postalCode: e.target.value })
              }
            />
          </div>
          <div className="form-field mt-4 mb-3">
            <div className="field-title mb-2">Country</div>
            <Select
              options={siteConfig.countryCode}
              onChange={(value) => setShippingAddress({ ...shippingAddress, country: value.label })}
              placeholder="Select Country"
            />
          </div>
          <div className="mt-4">
            <CustomButton
              title="Processed"
              background={siteConfig.colors.buttonOrangeColor}
              hoverBackground={siteConfig.colors.buttonOrangeColorHover}
              type="button"
              borderRadius={50}
              padding={8}
              callBack={() => submitHandler()}
              loader={orderLoader}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    ...state,
    addToCartProductsState: state.Cart,
  }
}

export default connect(mapStateToProps, null)(Payment)
