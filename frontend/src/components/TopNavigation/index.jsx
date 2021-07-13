/** @format */

import React, { useState } from 'react'

import { siteConfig } from '../../components/Static/static'
import './top-navigation.scss'

const TopNavigation = ({ menuContent }) => {
  const [showChildren, setShowChildren] = useState(false)
  const [itemId, setItemId] = useState('')
  const [childrenArray, setChildrenArray] = useState([])
  const [childrenArrayItem, setChildrenArrayItem] = useState('')

  const data = siteConfig.menuItem
  let objectKeys = Object.keys(data)

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
                          ? 'col-1-4 text-center menu-item-hover '
                          : 'col-1-4 text-center menu-item'
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
            </div>
          </div>

          <div className="col-md-2 text-right">
            <span>Login or </span>
            <span>Register</span>
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
                        <div className="item">
                          <div className="row">
                            <div className="col-md-5">
                              <img src={item.image} alt="menu" className="image-size" />
                            </div>
                            <div className="col-md-6 justify-content-center align-self-center detail-data">
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

export default TopNavigation
