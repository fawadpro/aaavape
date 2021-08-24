/** @format */

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Select from 'react-select'

import CustomButton from '../../components/Button'
import { siteConfig } from '../../components/Static/static'
import config from '../../config'
import './desktop-edit-profile.scss'
import Swal from 'sweetalert2'

const DesktopEditProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    postalCode: '',
    country: '',
  })
  const [loader, setLoader] = useState(false)
  const [fieldDisable, setFieldDisabled] = useState(false)

  useEffect(() => {
    getUserProfile()
  }, [])

  const getUserProfile = () => {
    setFieldDisabled(true)
    axios.get(`${config.apiPath}/api/v1/me`).then((res) => {
      setFieldDisabled(false)
      let user = res.data.user
      setFormData({
        ...formData,
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
        postalCode: user.postalCode,
        country: { label: user.country, value: user.country },
      })
    })
  }

  const submitHandler = () => {
    setLoader(true)
    axios
      .put(`${config.apiPath}/api/v1/me/update`, { ...formData, country: formData.country.label })
      .then((res) => {
        setLoader(false)
        Swal.fire('Success!', 'Record has been successfully updated', 'success')
      })
  }

  console.log('@@ user', formData)
  return (
    <div className="desktop-edit-profile-container">
      <div className="desktop-edit-profile-body">
        <div className="desktop-edit-profile-title">Edit Profile</div>

        <div className="form-field mt-4 mb-3">
          <div className="field-title mb-2">Name</div>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={fieldDisable}
          />
        </div>
        <div className="form-field mt-4 mb-3">
          <div className="field-title mb-2">Email</div>
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled
          />
        </div>

        <div className="form-field mt-4 mb-3">
          <div className="field-title mb-2">Shipping Address</div>
          <input
            type="text"
            className="form-control"
            placeholder="Shipping Address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            disabled={fieldDisable}
          />
        </div>

        <div className="form-field mt-4 mb-3">
          <div className="field-title mb-2">Phone</div>
          <input
            type="text"
            className="form-control"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            disabled={fieldDisable}
          />
        </div>

        <div className="form-field mt-4 mb-3">
          <div className="field-title mb-2">Postal Code</div>
          <input
            type="text"
            className="form-control"
            placeholder="Postal Code"
            value={formData.postalCode}
            onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
            disabled={fieldDisable}
          />
        </div>

        <div className="form-field mt-4 mb-3">
          <div className="field-title mb-2">Country</div>
          <Select
            options={siteConfig.countryCode}
            onChange={(value) => setFormData({ ...formData, country: value })}
            placeholder="Select Country"
            isDisabled={fieldDisable}
            value={formData.country}
          />
        </div>

        <div className="mt-4">
          <CustomButton
            title="Update"
            background={siteConfig.colors.buttonOrangeColor}
            hoverBackground={siteConfig.colors.buttonOrangeColorHover}
            type="button"
            borderRadius={50}
            padding={8}
            callBack={() => submitHandler()}
            loader={loader}
          />
        </div>
      </div>
    </div>
  )
}

export default DesktopEditProfile
