/** @format */

import React, { useState } from 'react'

import { siteConfig } from '../Static/static'
import './button-style.scss'

const Button = (props) => {
  const [hover, setHover] = useState(false)
  const { white } = siteConfig.colors
  const { loader } = props
  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      disabled={loader}
      type={props.type}
      {...props}
      onClick={(e) => {
        e.preventDefault()
        props.callBack()
      }}
      className={props.specialCase ? 'special-case' : 'button-container'}
      style={{
        backgroundColor: hover ? props.hoverBackground : props.background,
        color: props.butttonColor ? props.buttonColor : white,
        borderRadius: props.borderRadius ? props.borderRadius : 5,
        padding: props.padding ? props.padding : 6,
      }}
    >
      {loader ? <i className={`fa fa-circle-o-notch fa-spin`}></i> : props.title}
    </button>
  )
}

export default Button
