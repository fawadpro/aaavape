/** @format */

import React from 'react'
import Slideshow from '../../components/Slider'

import './desktop-slider-style.scss'

const DesktopSlider = () => {
  return (
    <Slideshow
      showIndex
      showArrows
      autoplay
      enableKeyboard
      useDotIndex
      slideInterval={5000}
      defaultIndex={0}
      slides={[
        'https://cdn.shopify.com/s/files/1/0505/5014/5221/files/Lark20210104-205349.jpeg?v=1609962781',
        'https://cdn.shopify.com/s/files/1/0505/5014/5221/files/Lark20210104-205419.jpeg?v=1609962802',
        'https://cdn.shopify.com/s/files/1/0505/5014/5221/files/Lark20210101-112811.jpeg?v=1609958368',
      ]}
      effect={'bottom'}
      height={'65%'}
      width={'100%'}
    />
  )
}

export default DesktopSlider
