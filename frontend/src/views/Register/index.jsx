/** @format */

import React, { useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { withRouter } from 'react-router-dom'
import Cookies from 'js-cookie'

import { UserRegister } from '../../redux/actions/user'
import RegisterInnner from './registerInner'
import LoginHero from '../../images/login-hero.png'
import LoginLogo from '../../images/logo.png'
import 'react-toastify/dist/ReactToastify.min.css'
import './register-style.scss'

const Register = ({
  userRegisterFun,
  userRegisterLoader,
  userRegisterState,
  history,
  userRegisterFailureState,
}) => {
  useMemo(() => {
    if (userRegisterState && userRegisterState.success) {
      toast.success('User has been Registered Successfully, please verify your email address', {
        toastId: 'loginError',
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })

      setTimeout(() => {
        window.location.href = '/login'
      }, 1200)
    } else if (userRegisterFailureState && userRegisterFailureState.status === 'fail') {
      toast.error('Email address must be unique', {
        toastId: 'loginError',
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    }
  }, [userRegisterState, userRegisterFailureState])

  useEffect(() => {
    const user = Cookies.get('aaavape_user')
    if (user === undefined) {
      history.push('/register')
    } else {
      history.push('/dashboard')
    }
  }, [])

  const userRegisterLocal = (value) => {
    userRegisterFun(value)
  }

  return (
    <div className="login-page-container ">
      <div className="page-left-container">
        <img
          src={LoginLogo}
          alt="Logo"
          className="logo-image cursor-pointer"
          onClick={() => history.push('/')}
        />
        <div className="form-area">
          <div className="form-title">Register</div>
          <div className="form-sub-title">Continue to AAAVAPE Official Website</div>
          <RegisterInnner onSubmit={userRegisterLocal} userRegisterLoader={userRegisterLoader} />
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
      </div>
      <div>
        <img src={LoginHero} alt="login hero" className="login-page-right-container-image" />
      </div>
    </div>
  )
}

export const mapDispatchToProps = (dispatch) => {
  return {
    userRegisterFun: (data) => dispatch(UserRegister(data)),
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    userRegisterLoader: state.User.userRegisterLoader,
    userRegisterState: state.User.userRegister,
    userRegisterFailureState: state.User.userRegisterFailure,
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register))
