/** @format */

import React, { Component } from 'react'
import { isMobile } from 'react-device-detect'
import Arrows from './Arrows.jsx'
import './Slideshow.scss'

class Slideshow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentSlide: props.defaultIndex,
      slideInterval: props.slideInterval,
      showIndex: props.showIndex,
      useDotIndex: props.useDotIndex,
      showArrows: props.showArrows,
      effect: props.effect,
      autoplay: props.autoplay,
      enableKeyboard: props.enableKeyboard,
      slides: props.slides.length > 0 ? props.slides : props.children,
    }

    this.runSlideShow = this.runSlideShow.bind(this)
    this.autoSlideshow = this.autoSlideshow.bind(this)
    this.restartSlideshow = this.restartSlideshow.bind(this)
    this.increaseCount = this.increaseCount.bind(this)
    this.decreaseCount = this.decreaseCount.bind(this)
    this.handleKeyboard = this.handleKeyboard.bind(this)
  }

  componentDidMount() {
    if (this.state.autoplay) this.runSlideShow()

    if (this.state.enableKeyboard) document.addEventListener('keydown', this.handleKeyboard)
  }

  handleKeyboard(e) {
    if (e.keyCode === 37) {
      this.decreaseCount()
    } else if (e.keyCode === 39) {
      this.increaseCount()
    } else {
      return null
    }
  }

  runSlideShow() {
    let intervalId = setInterval(this.autoSlideshow, this.state.slideInterval)
    this.setState({
      intervalId,
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId)
    document.removeEventListener('keydown', this.handleKeyboard)
  }

  autoSlideshow() {
    this.setState({
      currentSlide: (this.state.currentSlide + 1) % this.state.slides.length,
    })
  }

  restartSlideshow() {
    clearInterval(this.state.intervalId)
    this.runSlideShow()
  }

  increaseCount() {
    if (this.state.effect === 'left') {
      this.setState({ effect: 'right' })
    } else if (this.state.effect === 'bottom') {
      this.setState({ effect: 'bottom' })
    } else if (this.state.effect === 'bounce-left') {
      this.setState({ effect: 'bounce-left' })
    } else if (this.state.effect === 'bounce-right') {
      this.setState({ effect: 'bounce-right' })
    } else {
      return
    }

    if (this.state.autoplay) {
      this.restartSlideshow()
    } else {
      return null
    }

    this.setState({
      currentSlide: (this.state.currentSlide + 1) % this.state.slides.length,
    })
  }

  decreaseCount() {
    if (this.state.effect === 'right') {
      this.setState({ effect: 'left' })
    } else if (this.state.effect === 'bottom') {
      this.setState({ effect: 'bottom' })
    } else if (this.state.effect === 'bounce-right') {
      this.setState({ effect: 'bounce-right' })
    } else {
      return null
    }

    if (this.state.autoplay) {
      this.restartSlideshow()
    } else {
      return null
    }

    let currentSlide
    currentSlide =
      this.state.currentSlide === 0
        ? this.state.slides.length - 1
        : (currentSlide = this.state.currentSlide - 1)
    this.setState({
      currentSlide,
    })
  }

  updateSlideOnIndex = (index) => {
    this.setState({ currentSlide: index })
  }

  render() {
    const { slides, showIndex, useDotIndex, effect, showArrows } = this.state
    const { mobile } = this.props

    let slideEffect = effect === undefined ? 'fade' : effect
    let slideShowSlides
    let slideShowIndex

    if (!this.props.children) {
      slideShowSlides = slides.map((slide, i) => {
        return (
          <li
            className={`${mobile ? 'mobile-slide' : 'slide'} ${effect} ${
              this.state.currentSlide === i ? 'showing-' + slideEffect : ''
            }`}
            key={i}
            style={{ backgroundImage: `url(${slide})` }}
          />
        )
      })
    } else {
      slideShowSlides = slides.map((slide, i) => {
        return (
          <li
            className={`${mobile ? 'mobile-slide' : 'slide'} ${effect} ${
              this.state.currentSlide === i ? 'showing-' + slideEffect : ''
            }`}
            key={i}
          >
            {slide}
          </li>
        )
      })
    }

    if (useDotIndex) {
      slideShowIndex = (
        <div className="show-index is-dot">
          {slides.map((slide, i) => {
            return (
              <span
                className={`dot ${this.state.currentSlide === i ? 'is-active' : ''}`}
                key={`dot${i}`}
                onClick={() => {
                  this.updateSlideOnIndex(i)
                }}
              />
            )
          })}
        </div>
      )
    } else {
      slideShowIndex = (
        <div className="show-index is-text">
          <p>{`${this.state.currentSlide + 1} / ${slides.length}`}</p>
        </div>
      )
    }

    return (
      <div
        style={{
          position: 'relative',
          height: isMobile ? '260px' : '470px',
          width: this.props.width || '100%',
        }}
      >
        <div className="slideshow-container">
          <ul className="slides">{slideShowSlides}</ul>

          {showArrows && (
            <Arrows decreaseCount={this.decreaseCount} increaseCount={this.increaseCount} />
          )}

          {showIndex && slideShowIndex}
        </div>
      </div>
    )
  }
}

Slideshow.defaultProps = {
  showIndex: false,
  showArrows: true,
  autoplay: true,
  enableKeyboard: true,
  useDotIndex: false,
  slideInterval: 2000,
  defaultIndex: 0,
  effect: 'fade',
  slides: [],
  height: '100%',
  width: '100%',
}

export default Slideshow
