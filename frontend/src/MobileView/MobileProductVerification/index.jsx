/** @format */

import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

import ScanQR from '../../images/scan-qr.png'
import './mobile-product-verification.scss'

const MobileProductVerification = () => {
  const [productValue, setProductValue] = useState('')
  const [loader, setLoader] = useState(false)
  const validateProduct = () => {
    if (!productValue) {
      Swal.fire('Error!', 'Product code is required ', 'error')
      return
    }
    let bodyFormData = new FormData()
    bodyFormData.append('sn', productValue)
    setLoader(true)
    axios
      .post(
        'https://enigmatic-badlands-40184.herokuapp.com/http://m.ruiywx.com/deepin2/index.php/Home/Scanlog/deep5',
        bodyFormData
      )
      .then((res) => {
        setLoader(false)
        if (res.data.status === 'error') {
          Swal.fire('Error!', res.data.message, 'error')
        } else {
          Swal.fire('Success', res.data.message, 'success')
        }
      })
  }
  window.scrollTo(0, 0)
  return (
    <div className="mobile-product-verification-container">
      <div className="mobile-product-verification-body">
        <div className="mobile-main-title">Is your product authentic?</div>
        <div className="mobile-security-item">
          <div className="mobile-item-main-title">
            Please enter the authentic verification code.
          </div>
          <div className="mobile-check-code">
            <input
              type="text"
              placeholder="Enter the code"
              className="mobile-check-code-input"
              onChange={(e) => setProductValue(e.target.value)}
            />
            <button
              className="mobile-check-code-button"
              onClick={() => validateProduct()}
              disabled={loader}
            >
              {loader ? <i className={`fa fa-circle-o-notch fa-spin loader-area`}></i> : 'VERIFY'}
            </button>

            <p className="mobile-check-code-report">
              Report: Please report potentially counterfeit products to{' '}
              <span className="text-underline-report">support@aaavape.com</span>
            </p>
          </div>
        </div>

        <div className="mobile-security-item mb-4">
          <h2 className="mobile-item-main-title">
            Where can I find the authentic verification code?
          </h2>
          <div className="code-question">
            You can find the authentic verification code sticker on the product packaging box,
            scratch off the coating, and obtain the authentic verification code.
          </div>
          <div className="mobile-code-question-back mt-4">
            <img src={ScanQR} className="mt-4 qr-code-image " />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileProductVerification
