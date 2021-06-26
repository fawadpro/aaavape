/** @format */

import React from 'react'

import './search-field.scss'

const SearchField = () => {
  return (
    <div className="search-field-container">
      <i className="far fa-search search-logo" aria-hidden="true"></i>
      <input type="text" placeholder="Search aaavape.com" className="search-field" />
    </div>
  )
}

export default SearchField
