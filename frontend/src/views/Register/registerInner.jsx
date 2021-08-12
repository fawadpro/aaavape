/** @format */

import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { withRouter } from 'react-router-dom'
import Loader from 'react-loader-spinner'

import { renderFieldWithIcon, required } from '../../components/ReduxForm'

const RegisterInner = ({ handleSubmit, userRegisterLoader, history }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="login-inner-container">
        <div className="field-space-between">
          <Field
            name="name"
            type="text"
            component={renderFieldWithIcon}
            label="Name"
            icon="fas fa-user-circle"
            validate={[required]}
          />
        </div>
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
            {userRegisterLoader ? (
              <Loader type="ThreeDots" color="#ffffff" height="10" width="100" />
            ) : (
              'Register'
            )}
          </button>
        </div>

        <div className="field-space-between text-center">
          <span className="creation-placeholder">
            Already have an account?{' '}
            <span className="placeholder-heighlight" onClick={() => history.push('/login')}>
              Login
            </span>
          </span>
        </div>

        <div className="login-footer-area">
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
    form: 'registerInner',
  })(RegisterInner)
)
