/** @format */

import React, { useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { withRouter } from 'react-router-dom'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'

import { userRedirect } from '../../utils/user_redirect'
import { UserLogin } from '../../redux/actions/user'
import LoginInner from './loginInner'
import LoginHero from '../../images/login-hero.png'
import LoginLogo from '../../images/logo.png'
import './loginInner'
import 'react-toastify/dist/ReactToastify.min.css'
import './login-style.scss'

const Login = ({ userLoginFunc, userLoginLoader, userLoginState, history }) => {
  const user = Cookies.get('aaavape_user')
  const userDetail = user !== undefined && jwt_decode(user)

  useMemo(() => {
    if (userLoginState && userLoginState.success) {
      let userDetail = jwt_decode(userLoginState && userLoginState.token)

      Cookies.set('aaavape_user', userLoginState && userLoginState.token, {
        expires: 7,
      })
      return userRedirect(history)
    } else if (userLoginState && userLoginState.status === 'fail') {
      toast.error(userLoginState && userLoginState.message, {
        toastId: 'loginError',
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    }
  }, [userLoginState])

  // useEffect(() => {
  //   userRedirect(history)
  // }, [])
  const loginCompanyUser = (value) => {
    userLoginFunc(value)
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
          <div className="form-title">Log In</div>
          <div className="form-sub-title">Continue to AAAVAPE Official Website</div>
          <LoginInner onSubmit={loginCompanyUser} userLoginLoader={userLoginLoader} />
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
        <img src={LoginHero} alt="login hero" className="login-page-right-container-image " />
      </div>
    </div>
  )
}

export const mapDispatchToProps = (dispatch) => {
  return {
    userLoginFunc: (data) => dispatch(UserLogin(data)),
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    userLoginLoader: state.User.userLoginLoader,
    userLoginState: state.User.userLogin,
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
