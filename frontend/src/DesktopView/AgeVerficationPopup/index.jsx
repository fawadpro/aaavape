/** @format */

import React from 'react'

import PopUpImage from '../../images/popup-logo.png'
import './desktop-verfication.scss'

const AgeVerificationPopup = ({ callBack, warningTextShow }) => {
  return (
    <div className="desktop-verification-container ">
      <div className="desktop-verification-body">
        <div className="popup-header">
          <img src={PopUpImage} className="logo-image" alt="popup image" />
        </div>
        <div className="body-message">
          {warningTextShow ? (
            <span className="text-danger footer-main-body-with-space">
              You are too yong to view this website.
            </span>
          ) : (
            <>
              <span className="website-link">www.aaavape.com </span>is the ONLY official website of
              AAAVAPE as well as the ONLY site to verify the authenticity of the product purchased.
              By entering this website, you can certify that you are of legal age to purchase
              tobacco products in the state where you reside.
            </>
          )}
        </div>
        <div
          className={
            warningTextShow
              ? 'footer-button-container footer-container-with-space '
              : 'footer-button-container'
          }
        >
          <div className="button-cancel" onClick={() => callBack('no')}>
            {warningTextShow ? 'No' : 'Under 21'}
          </div>
          <div className="button-agree" onClick={() => callBack('yes')}>
            Yes
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgeVerificationPopup
