/** @format */

import React, { useState, useEffect, useMemo } from 'react'
import { withRouter } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import Cookies from 'js-cookie'
import _ from 'lodash'
import axios from 'axios'

import UnlockAccess from '../../components/_unlockComponent'
import { menus } from './_nav_menu'
import Avatar from '../../images/avatar.png'
import Logo from '../../images/transparent-logo.png'
import './nav-style.scss'

const SideBar = ({ children, location, history }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [active, setActive] = useState('')
  const [childActive, setChildActive] = useState(false)
  const [childMenuActive, setChildMenuActive] = useState('')
  const [arrow, setArrow] = useState(false)
  const { pathname } = location

  const token = Cookies.get('aaavape_user')
  const userDetail = token !== undefined && jwt_decode(token)

  useMemo(() => {
    if (userDetail === false && pathname !== '/login') {
      history.push('/')
    }
  }, [userDetail])

  useEffect(() => {
    if (menus.some((obj) => obj.url === pathname)) {
      setActive(pathname)
    }

    if (
      _.chain(menus)
        .map((item) => {
          return _.map(item.children, (item2) => {
            return item2.url
          })
        })
        .flatten()
        .value()
        .includes(pathname)
    ) {
      setArrow(true)
      setChildActive(true)
      setChildMenuActive(pathname)
    }
  }, [])

  const toggle = (menuUrl) => {
    if (menus.some((obj) => obj.url === menuUrl)) {
      setChildActive('')
      setArrow(false)
      setChildMenuActive(menuUrl)
      setActive(menuUrl)
    }
  }

  const childMenuToggle = (menuUrl) => {
    if (
      _.chain(menus)
        .map((item) => {
          return _.map(item.children, (item2) => {
            return item2.url
          })
        })
        .flatten()
        .value()
        .includes(menuUrl)
    ) {
      setChildMenuActive(menuUrl)
    }
  }

  const childToggle = (menuUrl) => {
    if (menus.some((obj) => obj.url === menuUrl)) {
      setChildActive(!childActive)
      setArrow(!arrow)
      setChildMenuActive(menuUrl)
      setActive(menuUrl)
    }
  }

  if (userDetail) {
    axios.interceptors.request.use(
      (config) => {
        config.headers.authorization = `${token}`
        return config
      },

      (error) => {
        return Promise.reject(error)
      }
    )
  }

  return (
    <>
      {pathname === '/' || pathname === '/login' || pathname === '/register' ? null : (
        <div className="side-bar-container" onClick={() => showDropdown && setShowDropdown(false)}>
          <div className="top-menu-container">
            <div className="logo-container" onClick={() => history.push('/')}>
              <img src={Logo} alt="website logo" className="logo" />
            </div>
            <div className="input-container">
              <i className="far fa-search search-logo"></i>
              <input type="text" placeholder="Search" className="input-field" />
            </div>
            <div>
              <div className="grid-container">
                <div className="grid-item">
                  <img src={Avatar} alt="default avatar" className="image-size" />
                </div>
                <div
                  className="grid-item text-color"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  {userDetail ? userDetail.name : ''}
                </div>
                <div
                  className="grid-item"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <i className="fas fa-angle-down text-color"></i>
                  {showDropdown && (
                    <div className="dropdown-container">
                      <div
                        className="dropdown-container-item"
                        onClick={() => history.push('/edit-profile')}
                      >
                        Edit Profile
                      </div>
                      <hr className="line-style" />
                      <div
                        className="dropdown-container-item"
                        onClick={() => {
                          Cookies.remove('aaavape_user')
                          history.push('/login')
                        }}
                      >
                        Sign Out
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-2-without-padding">
              <div className="left-nav-container">
                <div className="menu-overflow">
                  {menus.map((item, index) => (
                    <>
                      <UnlockAccess
                        currentUser={userDetail.role || null}
                        roles={item.roles}
                        key={index}
                      >
                        <div
                          className={
                            item.url === active && item && item.children && item.children.length
                              ? 'active-child-tab-container'
                              : item.url === active
                              ? 'active-tab-container'
                              : 'content-container'
                          }
                          key={index}
                        >
                          <div
                            className="menu-grid"
                            onClick={() => {
                              history.push(item.url)
                              item && item.children && item.children.length
                                ? childToggle(item.url)
                                : toggle(item.url)
                            }}
                          >
                            <div className="icon-container">
                              <i className={item.icon}></i>
                            </div>
                            <div>{item.name}</div>
                            {item && item.children && item.children.length && (
                              <div className="children-container">
                                <i
                                  className={
                                    item.url === active
                                      ? 'fa fa-chevron-down icon-dropdown-size'
                                      : 'fa fa-chevron-right icon-dropdown-size'
                                  }
                                />
                              </div>
                            )}
                          </div>
                        </div>
                        {item.url === active &&
                          item &&
                          item.children &&
                          item.children.map((childItem, index) => (
                            <div
                              className={
                                childItem.url === childMenuActive
                                  ? 'active-wrapper'
                                  : 'children-wrapper'
                              }
                              key={index}
                              onClick={() => history.push(childItem.url)}
                            >
                              <div
                                className="menu-grid"
                                onClick={() => childMenuToggle(childItem.url)}
                              >
                                <div>{childItem.name}</div>
                              </div>
                            </div>
                          ))}
                      </UnlockAccess>
                    </>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-md-10" style={{ background: '#f6f6f7' }}>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default withRouter(SideBar)
