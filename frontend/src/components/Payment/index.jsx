/** @format */

import React, { useState, useEffect } from 'react'
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js'
import _ from 'lodash'
import { connect } from 'react-redux'
import axios from 'axios'
import apiConfig from '../../config'
import Select from 'react-select'

import { siteConfig } from '../../components/Static/static'
import CustomButton from '../../components/Button'
import CreditCard from '../../images/credit-card.jpg'
import './payment-style.scss'

const options = {
  style: {
    base: {
      fontSize: '16px',
    },
    invalid: {
      color: '#9e2146',
    },
  },
}

const Payment = ({ history, addToCartProductsState }) => {
  const [extractedCartItem, setExtractedCartItem] = useState('')
  const stripe = useStripe()
  const elements = useElements()

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

  console.log('@@ extractedCartItem', extractedCartItem)

  const paymentData = {
    amount: Math.round(300),
  }

  let total_amount = _.sumBy(extractedCartItem, function (item) {
    return item.quantity * item.price
  })

  let createOrder = {
    totalPrice: total_amount,
    orderItems: extractedCartItem,
    shippingInfo: {
      address: 'F-10',
      city: 'Islamabad',
      phoneNo: 48398489,
      postalCode: 99999,
      country: 'Pakistan',
    },
    paymentInfo: {
      id: '',
      status: '',
    },
    user: '60fc59980d91bc13e0e2fce4',
  }

  const submitHandler = async () => {
    let res
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      res = await axios.post(`${apiConfig.apiPath}/api/v1/payment/process`, paymentData, config)

      const clientSecret = res.data.client_secret

      console.log(clientSecret)

      if (!stripe || !elements) {
        return
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: 'FAwad',
            email: 'fawadshah@gmail.com',
          },
        },
      })

      if (result.error) {
        console.log('@@@ error')
      } else {
        // The payment is processed or not
        if (result.paymentIntent.status === 'succeeded') {
          createOrder.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          }

          axios
            .post(`${apiConfig.apiPath}/api/v1/new-order`, createOrder)
            .then((res) => alert('Order has been placed'))

          setTimeout(() => {
            history.push('/')
          }, 500)

          // dispatch(createOrder(order))

          // history.push('/')
        } else {
          console.log('@@ Eeror')
          // alert.error('There is some issue while payment processing')
        }
      }
    } catch (error) {
      // document.querySelector('#pay_btn').disabled = false;
      // alert.error(error.response.data.message)
    }
  }
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
          <div className="form-field mt-4 mb-3">
            <div className="field-title mb-2">Credit Card Number</div>
            <CardNumberElement type="text" className="form-control" options={options} />
          </div>
          <div className="form-field mt-4 mb-3">
            <div className="field-title mb-2">Card Expiry</div>
            <CardExpiryElement type="text" className="form-control" options={options} />
          </div>
          <div className="form-field mt-4 mb-4">
            <div className="field-title mb-2">Card CSV</div>
            <CardCvcElement type="text" className="form-control" options={options} />
          </div>

          <hr />
          <div className="payment-detail-title">Billing Address</div>

          <div className="form-field mt-4 mb-3">
            <div className="field-title mb-2">Address</div>
            <input type="text" className="form-control" placeholder="Address" />
          </div>

          <div className="form-field mt-4 mb-3">
            <div className="field-title mb-2">Phone No</div>
            <input type="text" className="form-control" placeholder="Address" />
          </div>

          <div className="form-field mt-4 mb-3">
            <div className="field-title mb-2">Postal Code</div>
            <input type="text" className="form-control" placeholder="Address" />
          </div>
          <div className="form-field mt-4 mb-3">
            <div className="field-title mb-2">Country</div>
            <Select
              options={[
                { label: 'China', value: 'china' },
                { label: 'US', value: 'us' },
              ]}
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
