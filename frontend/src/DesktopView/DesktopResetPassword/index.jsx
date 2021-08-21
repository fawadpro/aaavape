/** @format */

import React, { useState } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Loader from 'react-loader-spinner'

import config from '../../config'
import ForgotPassword from '../../images/reset-password.svg'
import './desktop-reset-password.scss'
import Swal from 'sweetalert2'

const DesktopResetPassword = ({ history }) => {
  const [fieldActive, setFieldActive] = useState(false)
  const [email, setEmail] = useState('')
  const [loader, setLoader] = useState(false)

  const activeField = () => {
    setFieldActive(true)
  }

  const disableFocus = (e) => {
    setFieldActive(false)
  }

  const sendResetToken = () => {
    setLoader(true)
    axios
      .post(`${config.apiPath}/api/v1/password/forgot`, { email })
      .then((res) => {
        setLoader(false)
        Swal.fire('success', 'Email sent successfully', 'success').then((res) => {
          history.push('/')
        })
      })
      .catch(function (error) {
        Swal.fire('Error', error.response.data.message, 'error')
        setLoader(false)
      })
  }

  return (
    <div className="row reset-passwor-container">
      <div className="col-md-6 text-center">
        <img src={ForgotPassword} className="reset-password-image" />
      </div>
      <div className="col-md-4 text-center">
        <div className="forgot-title">Forgot Your Password ?</div>
        <div className="form-group-reset has-search mt-4">
          <span
            className={`fal fa-envelope ${
              fieldActive ? 'icon-focus' : 'icon-color'
            } form-control-feedback`}
            tabIndex="1"
          ></span>
          <input
            onFocus={() => activeField()}
            onBlur={(e) => disableFocus(e)}
            className="form-control fieldWithIcon"
            placeholder="Enter email address"
            autoComplete="new-password"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div
          className="reset-password-button"
          onClick={() =>
            !email ? Swal.fire('Error', 'Email is required', 'error') : sendResetToken()
          }
        >
          {loader ? (
            <Loader type="ThreeDots" color="#ffffff" height="10" width="100" />
          ) : (
            'Reset Password'
          )}
        </div>
      </div>
    </div>
  )
}

export default withRouter(DesktopResetPassword)
