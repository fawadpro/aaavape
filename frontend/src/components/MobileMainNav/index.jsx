/** @format */

import React from 'react'

import MobileTopMenu from '../../MobileView/MobileMainMenu'
import TopNotificationMobile from '../../MobileView/MobileTopNotificationArea'
import DesktopFooter from '../../DesktopView/DesktopFooter'

const DesktopMainNav = ({ children }) => {
  return (
    <>
      <TopNotificationMobile />
      <MobileTopMenu />
      {children}
      <DesktopFooter />
    </>
  )
}

export default DesktopMainNav
