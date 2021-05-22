/** @format */

import React, { useState } from 'react'

import { siteConfig } from '../Static/static'
import './button-style.scss'

const Button = (props) => {
  const [hover, setHover] = useState(false)
  const { white } = siteConfig.colors
  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      type="button"
      {...props}
      onClick={() => props.callBack()}
      className="button-container"
      style={{
        backgroundColor: hover ? props.hoverBackground : props.background,
        color: props.butttonColor ? props.buttonColor : white,
      }}
    >
      {props.title}
    </button>
  )
}

export default Button
