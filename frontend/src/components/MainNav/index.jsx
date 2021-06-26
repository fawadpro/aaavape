/** @format */

import React from 'react'

import TopNotificationDesktop from '../../DesktopView/DesktopTopNotificationArea'
import DesktopMainMenu from '../../DesktopView/DesktopMainMenu'

const DesktopMainNav = ({ children }) => {
  return (
    <>
      <TopNotificationDesktop />
      <DesktopMainMenu />
      {children}
    </>
  )
}

export default DesktopMainNav
