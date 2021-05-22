/** @format */

import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Pagination from 'rc-pagination'

import Button from '../../components/Button'
import Loader from '../../components/Loader'
import { siteConfig } from '../../components/Static/static'
import { fetchProducts } from '../../redux/actions/products'
import ProductInner from './productInner'
import './product-style.scss'
import 'rc-pagination/assets/index.css'

const Product = ({ fetchProductsFun, products, productLoader, history }) => {
  const [activeTab, setActiveTab] = useState('active')
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchAllProducts()
  }, [])

  const fetchAllProducts = () => {
    fetchProductsFun(page)
  }

  const callBack = () => {
    history.push('/add-product')
  }

  console.log('@@@@ products', products && products.products)
  return (
    <>
      {productLoader ? (
        <Loader title="Products" />
      ) : (
        <div className="product-container">
          <div className="row">
            <div className="product-main-title ml-3 mr-4">Products</div>

            <div className="col-md-4 push-to-button">
              <div className="search-filter-container">
                <div className="search-filter-pilar">
                  <span className="search-icon far fa-search"></span>
                  <input type="search" placeholder="Filter Products" className="search-input" />
                </div>
              </div>
            </div>
            <div className="col-md-6 text-right">
              <Button
                title="Add Product"
                background={siteConfig.colors.buttonOrangeColor}
                hoverBackground={siteConfig.colors.buttonOrangeColorHover}
                callBack={callBack}
              />
            </div>
          </div>

          <div className="product-main-table">
            <div className="tab-container">
              <div
                className={activeTab === 'active' ? 'tab-active' : 'tab-default'}
                onClick={() => setActiveTab('active')}
              >
                Active
              </div>
              <div
                className={activeTab === 'deleted_products' ? 'tab-active' : 'tab-default'}
                onClick={() => setActiveTab('deleted_products')}
              >
                Deleted Products
              </div>
            </div>

            <div className="main-body mt-4">
              <table className="custom-table">
                <thead className="field-width">
                  {siteConfig.productTableHead.map((item, index) => (
                    <>
                      <th
                        className={item.width === 'normal' ? 'width-normal' : 'width-normal'}
                        key={index}
                      >
                        {item.name}
                      </th>
                    </>
                  ))}
                </thead>
                {products && products.products && products.products.length === 0 ? (
                  <div className="mt-4">No products found</div>
                ) : (
                  <tbody>
                    {products &&
                      products.products &&
                      products.products.map((item, index) => (
                        <ProductInner key={index} item={item} />
                      ))}
                  </tbody>
                )}
              </table>
            </div>
            <div className="row">
              <div className="col-md-5 count-container">
                <span>
                  Showing
                  <span className="count-content-data">1-10 / </span>20
                </span>
              </div>
              <div className="col-md-6 text-right pagination-container">
                <Pagination
                  className="ps-pagination "
                  showPrevNextJumpers={false}
                  pageSize={10}
                  current={1}
                  // onChange={this.handleQueryChange}
                  total={products && products.products && products.products.length}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export const mapDispatchToProps = (dispatch) => {
  return {
    fetchProductsFun: (page) => dispatch(fetchProducts(page)),
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    products: state.Products.products,
    productLoader: state.Products.productLoader,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
