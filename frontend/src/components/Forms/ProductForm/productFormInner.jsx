/** @format */

import React, { useState, useMemo } from 'react'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { connect } from 'react-redux'
import RichTextEditor from 'react-rte'

import { convertBase64, getBase64FromUrl } from '../../../utils/general'
import {
  renderField,
  RichTextComponent,
  AttchmentModal,
  RenderVarientImage,
} from '../../ReduxForm/index'
import AttachedModalDetail from '../../AttachmentModel'
import { siteConfig } from '../../Static/static'
import AppButton from '../../Button'

let ProductFormInner = ({
  handleSubmit,
  costPerPrice,
  price,
  addProductLoader,
  varient_name,
  varient_image,
  varient_price,
  varientComparePrice,
  varientCostPerPrice,
  change,
  varient_stock,
  updateVarient,
  editing,
  editData,
  initialize,
}) => {
  const [varient, setVarient] = useState([])
  const [toggleVarient, setToggleVarient] = useState(false)
  const [init, setInit] = useState(false)
  const [description, setDescription] = useState()
  let profitPrice = price - costPerPrice
  let priceMargin = (100 * (price - costPerPrice)) / price
  let varientPriceMargin = (100 * (varient_price - varientCostPerPrice)) / varient_price
  let varientProfitPrice = varient_price - varientCostPerPrice

  useMemo(() => {
    updateVarient(varient)
  }, [varient])

  const toggleVarientFun = () => {
    setToggleVarient(!toggleVarient)
  }

  const varientData = async () => {
    setVarient([
      ...varient,
      {
        name: varient_name,
        varient_image: await convertBase64(varient_image),
        price: [
          {
            price: varient_price,
            compareAtPrice: varientComparePrice,
            costPerItem: varientCostPerPrice,
          },
        ],
        stock: varient_stock,
      },
    ])
  }

  if (init === false && editing === true && editData !== '') {
    initialize({
      ...editData,
      price: editData && editData.price && editData.price[0].price,
      comparePrice: editData && editData.price && editData.price[0].comparePrice,
      costPerPrice: editData && editData.price && editData.price[0].costPerPrice,
    })

    setInit(true)
    setVarient(editData && editData.varient)
    updateVarient(editData && editData.varient)
    setDescription(RichTextEditor.createValueFromString(editData && editData.description, 'html'))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-8">
          <div className="form-field-container">
            <div className="form-field">
              <div className="field-title">Title</div>
              <Field name="name" type="text" component={renderField} label="Cub 40 Mod KIT" />
            </div>

            <div className="form-field mt-4">
              <div className="field-title">Description</div>
              <Field
                name="description"
                type="text"
                component={RichTextComponent}
                label="Cub 40 Mod KIT"
                description={description}
              />
            </div>
          </div>

          <div className="form-field-container mt-4">
            <div className="form-field">
              <Field
                name="images"
                type="text"
                component={AttchmentModal}
                label="Cub 40 Mod KIT"
                editing={editing}
              />
            </div>
          </div>

          <div className="form-field-container mt-4">
            <div className="form-field">
              <div className="attachment-modal-header">
                <div className="attachment-header-title">Pricing</div>
              </div>
              <div className="form-field">
                <div className="row">
                  <div className="col-md-6">
                    <div className="field-title">Price</div>
                    <Field name="price" type="number" component={renderField} label="$ 0.0" />
                  </div>
                  <div className="col-md-6">
                    <div className="field-title">Compare at price</div>
                    <Field
                      name="comparePrice"
                      type="number"
                      component={renderField}
                      label="$ 0.0"
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <div className="field-title">Cost Per Item</div>
                    <Field
                      name="costPerPrice"
                      type="number"
                      component={renderField}
                      label="$ 0.0"
                    />
                  </div>
                  <div className="col-md-3 mt-3">
                    <div className="field-title" style={{ color: '#929598' }}>
                      Margin
                    </div>
                    <div>{priceMargin ? `$ ${Number(priceMargin).toFixed(2)}` : '-'}</div>
                  </div>

                  <div className="col-md-3 mt-3">
                    <div className="field-title" style={{ color: '#929598' }}>
                      Profit
                    </div>
                    <div>{profitPrice ? `$ ${profitPrice}` : '--'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="form-field-container mt-4">
            <div className="form-field">
              <div className="attachment-modal-header">
                <div className="row">
                  <div className="col-md-6">
                    <div className="attachment-header-title">Varients</div>
                  </div>
                  <div className="col-md-6 text-right">
                    <div className="varient-button" onClick={() => setToggleVarient(true)}>
                      Add Varient
                    </div>
                  </div>
                </div>

                {varient && varient.length > 0 && (
                  <div className="mt-4">
                    <span>Showing</span> {varient && varient.length} varients
                    {varient &&
                      varient.map((item, index) => (
                        <div className="row mt-4 varient-border " key={index}>
                          <div className="col-md-2">
                            <img
                              src={
                                item.image
                                  ? item && item.image && item.image.url
                                  : item.varient_image
                              }
                              alt="url"
                              className="varient-image"
                            />
                          </div>
                          <div className="col-md-8 align-self-center">
                            <div className="varient-header">{item.name}</div>
                          </div>
                          <div className="col-md-2">
                            <div className="varient-stock">
                              $ {item && item.price && item.price[0] && item.price[0].price}
                            </div>
                            <div className="varient-stock">{item.stock} Available</div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="stack-button ml-4">
            <AppButton
              title={editing ? 'Update Product' : 'Save Product'}
              background={siteConfig.colors.buttonOrangeColor}
              hoverBackground={siteConfig.colors.buttonOrangeColorHover}
              callBack={() => handleSubmit()}
              specialCase={true}
              type="submit"
              loader={addProductLoader}
            />
            <br />

            <Modal isOpen={toggleVarient} toggle={toggleVarientFun} className="general-content">
              <ModalHeader>Add Varient </ModalHeader>
              <ModalBody>
                <div className="form-field">
                  <div className="field-title">Title</div>
                  <Field
                    name="varient_name"
                    type="text"
                    component={renderField}
                    label="Cub 40 Mod KIT"
                  />
                </div>
                <div className="form-field mt-4">
                  <div className="field-title">Media</div>
                  {varient_image !== undefined ? null : (
                    <Field name="varient_image" type="text" component={RenderVarientImage} />
                  )}

                  {varient_image !== undefined ? (
                    <div className="row">
                      <div className="col-md-3">
                        <AttachedModalDetail
                          item={varient_image}
                          removeData={() => change('varient_image', undefined)}
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="form-field mt-4">
                  <div className="row mt-2">
                    <div className="col-md-6">
                      <div className="field-title">Price</div>
                      <Field
                        name="varient_price"
                        type="number"
                        component={renderField}
                        label="$ 0.0"
                      />
                    </div>
                    <div className="col-md-6">
                      <div className="field-title">Compare at price</div>
                      <Field
                        name="varientComparePrice"
                        type="number"
                        component={renderField}
                        label="$ 0.0"
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <div className="field-title">Cost Per Item</div>
                      <Field
                        name="varientCostPerPrice"
                        type="number"
                        component={renderField}
                        label="$ 0.0"
                      />
                    </div>
                    <div className="col-md-3 mt-3">
                      <div className="field-title" style={{ color: '#929598' }}>
                        Margin
                      </div>
                      <div>
                        {varientPriceMargin ? `$ ${Number(varientPriceMargin).toFixed(2)}` : '-'}
                      </div>
                    </div>

                    <div className="col-md-3 mt-3">
                      <div className="field-title" style={{ color: '#929598' }}>
                        Profit
                      </div>
                      <div>{varientProfitPrice ? `$ ${varientProfitPrice}` : '--'}</div>
                    </div>
                  </div>
                </div>

                <div className="form-field mt-4">
                  <div className="row mt-2">
                    <div className="col-md-6">
                      <div className="field-title">Varient Stock</div>
                      <Field
                        name="varient_stock"
                        type="number"
                        component={renderField}
                        label="Stock"
                      />
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={() => setToggleVarient(false)}>
                  Cancel
                </Button>
                <Button
                  color="success"
                  disabled={
                    !varient_price ||
                    !varient_image ||
                    !varientCostPerPrice ||
                    !varientComparePrice ||
                    !varient_stock
                  }
                  onClick={() => {
                    setToggleVarient(false)
                    varientData()
                    change('varient_image', undefined)
                    change('varient_price', undefined)
                    change('varientComparePrice', undefined)
                    change('varientCostPerPrice', undefined)
                    change('varient_stock', undefined)
                    change('varient_name', undefined)
                  }}
                >
                  Add
                </Button>
              </ModalFooter>
            </Modal>

            <div className="button-bold mt-4">Cancel</div>
          </div>
        </div>
      </div>
    </form>
  )
}

const selector = formValueSelector('ProductForm')
ProductFormInner = connect((state) => {
  const price = selector(state, 'price')
  const costPerPrice = selector(state, 'costPerPrice')
  const varient_name = selector(state, 'varient_name')
  const varient_image = selector(state, 'varient_image')
  const varient_price = selector(state, 'varient_price')
  const varientComparePrice = selector(state, 'varientComparePrice')
  const varientCostPerPrice = selector(state, 'varientCostPerPrice')
  const varient_stock = selector(state, 'varient_stock')

  return {
    price,
    costPerPrice,
    varient_name,
    varient_image,
    varient_price,
    varientComparePrice,
    varientCostPerPrice,
    varient_stock,
  }
})(ProductFormInner)

export default reduxForm({
  form: 'ProductForm',
})(ProductFormInner)
