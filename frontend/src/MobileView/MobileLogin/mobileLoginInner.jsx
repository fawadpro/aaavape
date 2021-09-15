/** @format */

import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { withRouter } from 'react-router-dom'
import Loader from 'react-loader-spinner'

import { renderFieldWithIcon, required } from '../../components/ReduxForm'

const MobileLoginInner = ({ handleSubmit, userLoginLoader, history }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mobile-login-inner-container">
        <div className="field-space-between">
          <Field
            name="email"
            type="text"
            component={renderFieldWithIcon}
            label="Email Address"
            icon="fal fa-envelope"
            validate={[required]}
          />
        </div>

        <div className="field-space-between">
          <Field
            name="password"
            type="password"
            component={renderFieldWithIcon}
            label="Password"
            icon="far fa-unlock-alt"
            validate={[required]}
          />
        </div>

        <div className="mb-4">
          <button type="submit" className="login-button">
            {userLoginLoader ? (
              <Loader type="ThreeDots" color="#ffffff" height="10" width="100" />
            ) : (
              'Log In'
            )}
          </button>{' '}
        </div>

        <div className="field-space-between text-center">
          <span className="creation-placeholder">
            Don't have an account?{' '}
            <span className="placeholder-heighlight" onClick={() => history.push('/register')}>
              Sign Up
            </span>
          </span>
        </div>

        <div className="field-space-between text-center">
          <span className="placeholder-heighlight" onClick={() => history.push('/forgot-password')}>
            Forgot Password ?
          </span>
        </div>

        <div className="mobile-login-footer-area">
          <div className="menu-color">Help</div>
          <div className="menu-color">Privacy</div>
          <div className="menu-color">Terms</div>
        </div>
      </div>
    </form>
  )
}

export default withRouter(
  reduxForm({
    form: 'loginMobileForm',
  })(MobileLoginInner)
)
