/** @format */

import React from 'react'
import { connect } from 'react-redux'

import MobileTopMenu from '../../MobileView/MobileMainMenu'
import TopNotificationMobile from '../../MobileView/MobileTopNotificationArea'
import DesktopFooter from '../../DesktopView/DesktopFooter'
import MobileMenuChild from '../../MobileView/MobileMenuChild'

const DesktopMainNav = ({ children, toggleMobileState }) => {
  return (
    <>
      <TopNotificationMobile />
      <MobileTopMenu />
      {toggleMobileState ? (
        <MobileMenuChild />
      ) : (
        <>
          {children}
          <DesktopFooter />
        </>
      )}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    ...state,
    toggleMobileState: state.TopMenu.toggleMobileState,
  }
}

export default connect(mapStateToProps, null)(DesktopMainNav)
