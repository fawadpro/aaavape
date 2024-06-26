/** @format */

import React from 'react'

import DesktopSlider from '../DesktopSlider'
import PromotionProduct from '../PromotionProduct'
import FeaturesProduct from '../DesktopFeaturedProducts'
import StoreLocatorHome from '../DesktopStoreLocatorHome'
import HomeAccessories from '../DesktopHomeAccessories'
import TopNavMenu from '../DesktopTopNavMenu'
import Testimonial from '../DesktopTestimonial'

const HomeDesktopView = () => {
  return (
    <>
      <TopNavMenu />
      <DesktopSlider />
      <PromotionProduct />
      <FeaturesProduct />
      <StoreLocatorHome />
      <HomeAccessories />
      {/* <Testimonial /> */}
    </>
  )
}

export default HomeDesktopView
