/** @format */

import React from 'react'

import TopNotificationDesktop from '../../DesktopView/DesktopTopNotificationArea'
import DesktopMainMenu from '../../DesktopView/DesktopMainMenu'
import DesktopFooter from '../../DesktopView/DesktopFooter'

const DesktopMainNav = ({ children }) => {
  return (
    <>
      <TopNotificationDesktop />
      <DesktopMainMenu />
      {children}
      <DesktopFooter />
    </>
  )
}

export default DesktopMainNav
