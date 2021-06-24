/** @format */

import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Pagination from 'rc-pagination'

import Button from '../../components/Button'
import Loader from '../../components/Loader'
import { siteConfig } from '../../components/Static/static'
import {
  fetchProducts,
  fetchDeleteProducts,
  fetchFilterProduct,
  fetchFilterDeletedProducts,
} from '../../redux/actions/products'
import ProductInner from './productInner'
import './product-style.scss'
import 'rc-pagination/assets/index.css'

const Product = ({
  fetchProductsFun,
  products,
  productLoader,
  history,
  fetchDeleteProductsFun,
  fetchFilterProductFun,
  fetchFilterDeletedProductFun,
}) => {
  const [activeTab, setActiveTab] = useState('active')
  const [productName, setProductName] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (!productName) {
      fetchAllProducts()
    }
    const timeoutId = setTimeout(() => {
      if (activeTab === 'deleted_products' && productName) {
        fetchFilterDeletedProductFun(productName)
      } else if (activeTab === 'active' && productName) {
        fetchFilterProductFun(productName)
      } else {
        return
      }
    }, 1000)
    return () => clearTimeout(timeoutId)
  }, [productName])

  const fetchAllProducts = (pageSize) => {
    fetchProductsFun(pageSize ? pageSize : page)
  }

  const handleQueryChange = (current) => {
    setPage(current)
    if (activeTab === 'deleted_products') {
      fetchDeleteProductsFun(current)
    } else {
      fetchProductsFun(current)
    }
  }

  const fetchDeletedProducts = (pageSize) => {
    fetchDeleteProductsFun(pageSize ? pageSize : page)
  }

  const callBack = () => {
    history.push('/add-product')
  }

  return (
    <>
      {productLoader ? (
        <Loader title={activeTab === 'deleted_products' ? 'Deleted Products' : 'Products'} />
      ) : (
        <div className="product-container">
          <div className="row">
            <div className="product-main-title ml-3 mr-4">Products</div>

            <div className="col-md-4 push-to-button">
              <div className="search-filter-container">
                <div className="search-filter-pilar">
                  <span className="search-icon far fa-search"></span>
                  <input
                    type="search"
                    placeholder="Filter Products"
                    className="search-input"
                    onChange={(e) => {
                      setProductName(e.target.value)
                    }}
                    value={productName}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 text-right">
              <Button
                title="Add Product"
                background={siteConfig.colors.buttonOrangeColor}
                hoverBackground={siteConfig.colors.buttonOrangeColorHover}
                callBack={callBack}
                type="button"
              />
            </div>
          </div>

          <div className="product-main-table">
            <div className="tab-container">
              <div
                className={activeTab === 'active' ? 'tab-active' : 'tab-default'}
                onClick={() => {
                  fetchAllProducts(1)
                  setActiveTab('active')
                  setPage(1)
                  setProductName('')
                }}
              >
                Active
              </div>
              <div
                className={activeTab === 'deleted_products' ? 'tab-active' : 'tab-default'}
                onClick={() => {
                  fetchDeletedProducts(1)
                  setActiveTab('deleted_products')
                  setPage(1)
                  setProductName('')
                }}
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
                        <ProductInner key={index} item={item} activeTab={activeTab} />
                      ))}
                  </tbody>
                )}
              </table>
            </div>
            <div className="row">
              <div className="col-md-5 count-container">
                Showing
                <span className="count-color">
                  {(page - 1) * 10 + 1} -
                  {products && products.total >= page * 10 ? page * 10 : products && products.total}
                </span>
                / {products && products.total}
              </div>
              <div className="col-md-6 text-right pagination-container">
                <Pagination
                  className="ps-pagination "
                  showPrevNextJumpers={false}
                  hideOnSinglePage={true}
                  pageSize={10}
                  current={page}
                  onChange={handleQueryChange}
                  total={products && products.total}
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
    fetchDeleteProductsFun: (page) => dispatch(fetchDeleteProducts(page)),
    fetchFilterProductFun: (name) => dispatch(fetchFilterProduct(name)),
    fetchFilterDeletedProductFun: (name) => dispatch(fetchFilterDeletedProducts(name)),
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
