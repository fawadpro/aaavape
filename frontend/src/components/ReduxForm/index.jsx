/** @format */

import React, { Component } from 'react'

import './redux-form-style.scss'

export class renderField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
    }
  }

  updateInputValue = (e) => {
    this.setState({
      inputValue: e.target.value,
    })
    e.preventDefault()
  }
  render() {
    const { fieldActive } = this.state
    const {
      type,
      label,
      height,
      input,
      fieldId,
      customValue,
      meta: { touched, error },
    } = this.props

    return (
      <div className="inputform newForm">
        <input
          className={
            height
              ? `form-control input-box focusText fieldHeight`
              : `form-control input-box focusText`
          }
          id={fieldId}
          {...input}
          type={type}
          placeholder={fieldActive && !fieldActive ? '' : label}
          disabled={customValue}
          autoComplete="new-password"
        />

        {touched && error && <p className="price-box">{error}</p>}
      </div>
    )
  }
}

export class renderFieldWithIcon extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      fieldActive: false,
      colorChange: false,
    }
  }

  activeField = () => {
    this.setState({
      fieldActive: true,
      colorChange: false,
    })
  }

  disableFocus = (e) => {
    this.setState({
      fieldActive: false,
    })
  }

  updateInputValue = (e) => {
    this.setState({
      inputValue: e.target.value,
    })
    this.activateField(e)
    e.preventDefault()
  }
  render() {
    const { fieldActive } = this.state
    const {
      type,
      icon,
      label,
      input,
      fieldId,
      customValue,
      meta: { touched, error },
    } = this.props

    return (
      <div className="inputform newForm">
        <div className="form-group has-search">
          <span
            className={`${icon} ${fieldActive ? 'icon-focus' : 'icon-color'} form-control-feedback`}
            tabIndex="1"
          ></span>
          <input
            className="form-control fieldWithIcon"
            id={fieldId}
            {...input}
            onFocus={() => this.activeField()}
            onBlur={(e) => this.disableFocus(e)}
            type={type}
            placeholder={fieldActive && !fieldActive ? '' : label}
            disabled={customValue}
            autoComplete="new-password"
          />
        </div>

        {touched && error && <div className="error-message">{error}</div>}
      </div>
    )
  }
}

export const required = (value) => (value ? undefined : 'Field is Required')
