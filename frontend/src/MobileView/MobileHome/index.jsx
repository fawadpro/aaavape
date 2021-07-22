/** @format */

import React from 'react'

import MobileMainMenu from '../MobileMainMenu'
import MobileSlider from '../MobileSlider'
import TopNotificationMobile from '../MobileTopNotificationArea'
import MobilePromotionProduct from '../MobilePromotionProduct'
import MobileFeaturedProduct from '../MobileFeaturedProducts'
import MobileStoreLocatorHome from '../MobileStoreLocator'

const HomeMobile = () => {
  return (
    <>
      <MobileSlider />
      <MobilePromotionProduct />
      <MobileFeaturedProduct />
      <MobileStoreLocatorHome />
    </>
  )
}

export default HomeMobile
