/** @format */

import React, { useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Loader from 'react-loader-spinner'

import config from '../../config'
import Logo from '../../images/main-logo.webp'
import './new-password.scss'

const DesktopNewPassword = ({ history, match }) => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fieldActive, setFieldActive] = useState(false)
  const [loader, setLoader] = useState(false)
  const [focusMatch, setFocusMatch] = useState('')

  const activeField = (type) => {
    setFieldActive(true)
    setFocusMatch(type)
  }

  const disableFocus = (e) => {
    setFieldActive(false)
  }

  const setNewPassword = (params) => {
    setLoader(true)
    axios
      .put(`${config.apiPath}/api/v1/password/reset/${params.token}`, {
        password,
        confirmPassword,
      })
      .then((res) => {
        setLoader(false)
        Swal.fire('success', 'Password successfully changed', 'success').then((res) => {
          history.push('/login')
        })
      })
      .catch(function (error) {
        Swal.fire('Error', error.response.data.message, 'error')
        setLoader(false)
      })
  }

  console.log('2@@ match', match.params)

  return (
    <div className="new-password-container">
      <img src={Logo} className="main-logo-image" />

      <div className="form-group-new-password has-search mt-4">
        <span
          className={`far fa-unlock-alt  ${
            fieldActive && focusMatch === 'password' ? 'icon-focus' : 'icon-color'
          } form-control-feedback`}
          tabIndex="1"
        ></span>
        <input
          onFocus={() => activeField('password')}
          onBlur={(e) => disableFocus(e)}
          className="form-control newPasswordIcon"
          placeholder="Password"
          autoComplete="new-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="form-group-new-password  has-search mb-4 mt-4">
        <span
          className={`far fa-unlock-alt ${
            fieldActive && focusMatch === 'confirmPassword' ? 'icon-focus' : 'icon-color'
          } form-control-feedback`}
          tabIndex="2"
        ></span>
        <input
          onFocus={() => activeField('confirmPassword')}
          onBlur={(e) => disableFocus(e)}
          className="form-control newPasswordIcon"
          placeholder="Confirm Password"
          autoComplete="new-password"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <div
        className="new-password-button"
        onClick={() => {
          if (password !== confirmPassword) {
            Swal.fire('Error', 'Password does not match', 'error')
          } else if (!password || !confirmPassword) {
            Swal.fire('Error', 'Password Required!', 'error')
          } else {
            setNewPassword(match.params)
          }
        }}
      >
        {loader ? (
          <Loader type="ThreeDots" color="#ffffff" height="10" width="100" />
        ) : (
          'New Password'
        )}
      </div>
    </div>
  )
}

export default withRouter(DesktopNewPassword)
