/** @format */

import React from 'react'

import AnimationImage from '../../images/main-logo.webp'
import './async-loader.scss'

const AsyncLoader = () => {
  return (
    <div className="async-loader-container">
      <img src={AnimationImage} className="animation-loader-image" />
      <div>Loading...</div>
    </div>
  )
}

export default AsyncLoader
