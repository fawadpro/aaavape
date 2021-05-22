/** @format */

import React from 'react'
import BuiltLoader from 'react-loader-spinner'

import './loader-style.scss'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const Loader = ({ title }) => {
  return (
    <div className="loader-container">
      <div className="content-area">
        <div className="title">Loading {title}</div>
        <div className="mt-4">
          <BuiltLoader type="Puff" color="#F7AF3A" height={100} width={100} />
        </div>
      </div>
    </div>
  )
}

export default Loader
