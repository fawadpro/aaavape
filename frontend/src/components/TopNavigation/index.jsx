/** @format */

import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import Cookies from 'js-cookie'

import { userRedirect } from '../../utils/user_redirect'
import { fetchMenus } from '../../redux/actions/topMenu'
import './top-navigation.scss'

const TopNavigation = ({ menuContent, fetchTopMenus, topMenuState, history }) => {
  const [showChildren, setShowChildren] = useState(false)
  const [itemId, setItemId] = useState('')
  const [childrenArray, setChildrenArray] = useState([])
  const [childrenArrayItem, setChildrenArrayItem] = useState('')

  useEffect(() => {
    fetchTopMenus()
  }, [])
  const token = Cookies.get('aaavape_user')
  const userDetail = token !== undefined && jwt_decode(token)

  const data = topMenuState !== undefined ? topMenuState : {}
  let objectKeys = Object.keys(data)

  console.log('2@ userDetail', userDetail)

  return (
    <>
      <div className="top-navigation-container" onMouseLeave={() => setItemId('')}>
        <div className="row pl-3 pr-3 edges-width">
          <div className="col-md-10 text-right">
            <div className="row">
              {menuContent &&
                menuContent.map((item, index) => (
                  <>
                    <div
                      className={
                        itemId === item.id
                          ? 'col-1-4 text-center menu-item-hover  pt-1"'
                          : 'col-1-4 text-center menu-item  pt-1"'
                      }
                      key={index}
                      onMouseEnter={() => {
                        setItemId(item.id)
                        return item && item.children && item.children.length
                          ? setTimeout(() => {
                              setShowChildren(true)
                              setChildrenArray(data[objectKeys[0]])
                              setChildrenArrayItem(objectKeys[0])
                            }, 200)
                          : null
                      }}
                    >
                      {item.name}
                      <span className="ml-2 icon-vertical">
                        {item && item.children && item.children.length ? (
                          itemId === item.id ? (
                            <i className="fas fa-minus"></i>
                          ) : (
                            <i className="fas fa-chevron-down"></i>
                          )
                        ) : null}
                      </span>
                      {itemId === item.id && item && item.children && item.children.length ? (
                        <i className="fas fa-caret-down nav-icon"></i>
                      ) : null}
                    </div>
                  </>
                ))}
              <div className="col-5-5 pt-0">
                <button
                  className="verify-custom-button"
                  onClick={() => history.push('/product-verification')}
                >
                  Verify
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-2 text-right pt-1">
            <span className="cursor-pointer" onClick={() => userRedirect(history)}>
              {userDetail ? (
                <span style={{ color: '#F7AF3A' }}>
                  <span style={{ color: '#000' }}>Hello, </span>
                  {userDetail && userDetail.name}
                </span>
              ) : (
                'Login'
              )}
            </span>
            {userDetail ? null : (
              <>
                <span className="mr-2 ml-2">or</span>
                <span className="cursor-pointer" onClick={() => history.push('/register')}>
                  Register
                </span>
              </>
            )}
          </div>
        </div>

        {showChildren && (
          <div
            className="children-container"
            onMouseEnter={() => setShowChildren(true)}
            onMouseLeave={() => {
              setItemId('')
              setShowChildren(false)
            }}
          >
            <div className="children-row">
              <div className="item mt-4">
                {objectKeys.map((item, index) => (
                  <div
                    className={childrenArrayItem === item ? 'menu-active' : 'menu-non-active'}
                    key={index}
                    onClick={() => {
                      setChildrenArrayItem(item)
                      setChildrenArray(data[item])
                    }}
                  >
                    {item}
                    {childrenArrayItem === item && (
                      <span className="float-right mr-2">
                        <i className="fas fa-arrow-right"></i>
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="ml-4">
                <div className="row">
                  {childrenArray &&
                    childrenArray.map((item, index) => (
                      <div className="col-md-4" key={index}>
                        <div
                          className="item"
                          onClick={() => history.push(`/product-detail/${item.id}`)}
                        >
                          <div className="row">
                            <div className="col-md-5">
                              <img src={item.image} alt="menu" className="image-size" />
                            </div>
                            <div className="col-md-7 justify-content-center align-self-center detail-data">
                              <div className="data-container">
                                <div className="title">{item.title}</div>
                                <div className="subtitle">{item.description}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export const mapDispatchToProps = (dispatch) => {
  return {
    fetchTopMenus: () => dispatch(fetchMenus()),
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    topMenuState: state.TopMenu.topMenus,
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopNavigation))
