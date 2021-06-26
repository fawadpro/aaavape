/** @format */

import React from 'react'
import { isMobile } from 'react-device-detect'

import HomeDesktopView from '../../DesktopView/DesktopHome'
import HomeMobileView from '../../MobileView/MobileHome'

const Home = () => {
  return isMobile ? <HomeMobileView /> : <HomeDesktopView />
}

export default Home
