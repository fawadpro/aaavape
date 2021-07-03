/** @format */

import React, { useState } from 'react'

import './top-navigation.scss'

const TopNavigation = ({ menuContent }) => {
  const [childrenItem, setChildrenItem] = useState([])
  const [showChildren, setShowChildren] = useState(false)
  const [itemId, setItemId] = useState('')
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
              <div className="item justify-content-center align-self-center detail-data change-list-item">
                <div className="menu-active">
                  Box Mod Kit
                  <span className="float-right mr-2">
                    <i className="fas fa-arrow-right"></i>
                  </span>
                </div>
                <div className="menu-non-active">POD Systems</div>
                <div className="menu-non-active">POD Mod Systems</div>
                <div className="menu-non-active">Vape Pen Kits</div>
                <div className="menu-non-active">Disponsable</div>
                <div className="menu-non-active">Tanks</div>
                <div className="menu-non-active">Coils</div>
              </div>

              <div className="item ">
                <div className="row">
                  <div className="col-md-5">
                    <img
                      src="https://cdn.shopify.com/s/files/1/0505/5014/5221/products/BlackCrack_1024x1024@2x.png?v=1608722666"
                      alt="menu"
                      className="image-size"
                    />
                  </div>
                  <div className="col-md-6 justify-content-center align-self-center detail-data">
                    <div className="data-container">
                      <div className="title">Hello</div>
                      <div className="subtitle">
                        kjfasdjkfjkadsjkfjasdjkfjkdsjkfjkasdjkfjjsjkfsjkdfkjds ...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="row">
                  <div className="col-md-5">
                    <img
                      src="https://cdn.shopify.com/s/files/1/0505/5014/5221/products/BlackCrack_1024x1024@2x.png?v=1608722666"
                      alt="menu"
                      className="image-size"
                    />
                  </div>
                  <div className="col-md-6 justify-content-center align-self-center detail-data">
                    <div className="data-container">
                      <div className="title">Hello</div>
                      <div className="subtitle">
                        kjfasdjkfjkadsjkfjasdjkfjkdsjkfjkasdjkfjjsjkfsjkdfkjds ...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="row">
                  <div className="col-md-5">
                    <img
                      src="https://cdn.shopify.com/s/files/1/0505/5014/5221/products/BlackCrack_1024x1024@2x.png?v=1608722666"
                      alt="menu"
                      className="image-size"
                    />
                  </div>
                  <div className="col-md-6 justify-content-center align-self-center detail-data">
                    <div className="data-container">
                      <div className="title">Hello</div>
                      <div className="subtitle">
                        kjfasdjkfjkadsjkfjasdjkfjkdsjkfjkasdjkfjjsjkfsjkdfkjds ...
                      </div>
                    </div>
                  </div>
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
