/** @format */

import React from 'react'
import { withRouter } from 'react-router-dom'

import Cheers from '../../images/cheers.jpeg'
import './email-success.scss'

const EmailSuccess = ({ history }) => {
  return (
    <div className="verification-main-container">
      <div className="verification-main-body">
        <img src={Cheers} className="cheers-image " />

        <div className="verification-main-title">Congratulations!</div>
        <div className="verification-main-subtitle">You have successfully verified account</div>

        <div className="verification-main-button" onClick={() => history.push('/login')}>
          Go to Login{' '}
        </div>
      </div>
    </div>
  )
}

export default withRouter(EmailSuccess)
