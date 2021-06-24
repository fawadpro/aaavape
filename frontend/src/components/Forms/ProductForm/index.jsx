/** @format */

import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

import config from '../../../config'
import { convertBase64, getBase64FromUrl } from '../../../utils/general'
import { addProduct, updateProduct } from '../../../redux/actions/products'
import ProductFormInner from './productFormInner'
import './product-form-style.scss'

const ProductForm = ({ addProductFun, addProductLoader, match, updateProductFun }) => {
  const [varient, setVarient] = useState([])
  const [editData, setEditData] = useState({})
  const [editing, setEditing] = useState(false)
  const token = Cookies.get('aaavape_user')
  const userDetail = token !== undefined && jwt_decode(token)

  useEffect(() => {
    fetchProductDetail()
  }, [])
  const addProduct = async (value) => {
    const file =
      value &&
      value.images &&
      value.images.map((item) => {
        if (item.url) {
          const base64 = getBase64FromUrl(item.url)
          return base64
        } else {
          const base64 = convertBase64(item)
          return base64
        }
      })

    let imageResponse = await Promise.all(file)

    let varientData =
      varient &&
      varient.map((item) => ({
        ...item,
        varient_image: item.varient_image
          ? item.varient_image
          : item.image
          ? getBase64FromUrl(item.image.url)
          : item.varient_image,
      }))

    const myImages = await Promise.all(varientData && varientData.map((item) => item.varient_image))

    let price = [
      {
        price: value.price,
        comparePrice: value.comparePrice,
        costPerPrice: value.costPerPrice,
      },
    ]
    let data = {
      name: value.name,
      description: value.description,
      price,
      images: imageResponse,
      varient:
        varient &&
        varient.map((item, index) => ({
          name: item.name,
          price: item.price,
          stock: item.stock,
          varient_image: myImages[index],
        })),
      reviews: [],
      userId: userDetail && userDetail.id,
      createdAt: value.createdAt,
    }

    if (editing) {
      updateProductFun(data, editData && editData._id)
    } else {
      addProductFun(data)
    }
  }

  const updateVarient = (value) => {
    setVarient(value)
  }

  const fetchProductDetail = () => {
    if (match.path === '/update-product/:id') {
      const productId = match.params.id
      axios.get(`${config.apiPath}/api/v1/admin/product/${productId}`).then((response) => {
        setEditData(response.data.product)
        setEditing(true)
      })
    }
  }

  return (
    <div className="product-form-container">
      <div className="product-route-container">
        <div className="back-to-route">
          <i className="fas fa-arrow-left"></i>
        </div>
        <div className="title">Add product</div>
      </div>

      <div className="form-inner-container">
        <div className="container-fluid">
          <ProductFormInner
            onSubmit={addProduct}
            addProductLoader={addProductLoader}
            updateVarient={updateVarient}
            editing={editing}
            editData={editData}
          />
        </div>
      </div>
    </div>
  )
}

export const mapDispatchToProps = (dispatch) => {
  return {
    addProductFun: (data) => dispatch(addProduct(data)),
    updateProductFun: (data, id) => dispatch(updateProduct(data, id)),
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    addProductLoader: state.Products.addProductLoader,
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductForm))
