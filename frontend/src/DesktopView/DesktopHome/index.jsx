/** @format */

import React from 'react'

import DesktopSlider from '../DesktopSlider'
import PromotionProduct from '../PromotionProduct'
import FeaturesProduct from '../DesktopFeaturedProducts'
import StoreLocatorHome from '../DesktopStoreLocatorHome'
import HomeAccessories from '../DesktopHomeAccessories'

const HomeDesktopView = () => {
  return (
    <>
      <DesktopSlider />
      <PromotionProduct />
      <FeaturesProduct />
      <StoreLocatorHome />
      <HomeAccessories />
    </>
  )
}

export default HomeDesktopView
