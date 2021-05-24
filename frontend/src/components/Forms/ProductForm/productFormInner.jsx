/** @format */

import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { renderField, RichTextComponent, AttchmentModal } from '../../ReduxForm/index'

const ProductFormInner = () => {
  return (
    <div className="row">
      <div className="col-md-7">
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
            />
          </div>
        </div>

        <div className="form-field-container mt-4">
          <div className="form-field">
            <Field name="name" type="text" component={AttchmentModal} label="Cub 40 Mod KIT" />
          </div>
        </div>
      </div>
      <div className="col-md-5">
        <div>hello</div>
      </div>
    </div>
  )
}

let ProductForm = reduxForm({
  form: 'ProductForm',
})(ProductFormInner)

export default ProductForm
