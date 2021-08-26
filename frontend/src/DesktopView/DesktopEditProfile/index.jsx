/** @format */

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Select from 'react-select'
import EllipsisWithTooltip from 'react-ellipsis-with-tooltip'
import _ from 'lodash'

import CustomButton from '../../components/Button'
import { siteConfig } from '../../components/Static/static'
import config from '../../config'
import './desktop-edit-profile.scss'
import Swal from 'sweetalert2'

const DesktopEditProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    address: '',
    phone: '',
    postalCode: '',
    country: '',
    company: '',
    province: '',
    apartment: '',
  })
  const [loader, setLoader] = useState(false)
  const [userInfo, setUserInfo] = useState('')
  const [addressLoader, setAddressLoader] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState(false)
  const [itemContent, setItemContent] = useState({})

  useEffect(() => {
    getUserProfile()
  }, [])

  const getUserProfile = () => {
    setAddressLoader(true)
    axios.get(`${config.apiPath}/api/v1/me`).then((res) => {
      setAddressLoader(false)
      let user = res.data.user
      setUserInfo(user)
    })
  }

  const submitHandler = () => {
    if (editItem) {
      let index = _.findIndex(userInfo.address, { _id: itemContent })

      userInfo.address.splice(index, 1, {
        ...formData,
        country: formData.country.value,
        province: formData.province.value,
      })

      setUserInfo(userInfo.address)
    } else {
      userInfo.address = [
        ...userInfo.address,
        {
          ...formData,
          country: formData.country.value,
          province: formData.province.value,
        },
      ]
    }

    setLoader(true)
    axios.put(`${config.apiPath}/api/v1/me/update`, userInfo).then((res) => {
      setLoader(false)
      Swal.fire('Success!', 'Record has been successfully updated', 'success')
      getUserProfile()
      setShowForm(false)
    })
  }

  const removeSpecificData = (id) => {
    let index = _.findIndex(userInfo.address, { _id: id })
    userInfo && userInfo.address.splice(index, 1)
    setUserInfo(userInfo.address)
    axios.put(`${config.apiPath}/api/v1/me/update`, userInfo).then((res) => {
      setLoader(false)
      Swal.fire('Success!', 'Record has been successfully deleted', 'success')
      getUserProfile()
      setShowForm(false)
    })
  }

  console.log('@@ show')

  return (
    <div className="desktop-edit-profile-container">
      <div className="desktop-edit-profile-body">
        <div className="row">
          <div className="col-md-4 pl-0">
            <div className="desktop-edit-profile-title">Edit Profile</div>
          </div>
          <div className="col-md-8 text-right pr-0">
            <CustomButton
              title="Add new address +"
              background={siteConfig.colors.buttonOrangeColor}
              hoverBackground={siteConfig.colors.buttonOrangeColorHover}
              type="button"
              borderRadius={50}
              padding={8}
              callBack={() => {
                setFormData({})
                setShowForm(!showForm)
                setEditItem(false)
              }}
              loader={false}
            />
          </div>
        </div>

        {addressLoader ? (
          <i className={`fa fa-circle-o-notch fa-spin mt-4`} style={{ color: '#F7AF3A' }}></i>
        ) : userInfo && userInfo.address && userInfo.address.length === 0 && !showForm ? (
          <div className="mt-4" style={{ color: '#777' }}>
            No addresses found , please add new
          </div>
        ) : userInfo && userInfo.address && userInfo.address.length > 0 && !showForm ? (
          <>
            {userInfo &&
              userInfo.address &&
              userInfo.address.map((item, index) => (
                <div className="mt-4" key={index}>
                  <div className="addresses-container mt-4">
                    <div className="row">
                      <div className="col-md-9">
                        <span className="address-main-title mr-2">{item.name}</span>
                        <span className="address-subtitle">
                          <EllipsisWithTooltip placement="top">{item.address}</EllipsisWithTooltip>
                        </span>
                      </div>
                      <div className="col-md-3 text-right">
                        <span
                          className="address-action"
                          onClick={() => {
                            setShowForm(true)
                            setFormData({
                              ...item,
                              country: { label: item.country, value: item.country },
                              province: { label: item.province, value: item.province },
                            })
                            setEditItem(true)
                            setItemContent(item._id)
                          }}
                        >
                          Edit
                        </span>
                        <span className="ml-2 mr-2">|</span>
                        <span
                          className="address-action"
                          onClick={() => {
                            removeSpecificData(item._id)
                          }}
                        >
                          Delete
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </>
        ) : (
          showForm && (
            <>
              <div className="form-field mt-4 mb-3">
                <div className="field-title mb-2">Name</div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-field mt-4 mb-3">
                <div className="field-title mb-2">Company</div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
              <div className="form-field mt-4 mb-3">
                <div className="field-title mb-2">Address</div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Shipping Address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
              <div className="form-field mt-4 mb-3">
                <div className="field-title mb-2">Apartment, suite, etc.</div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Apartment, suite, etc."
                  value={formData.apartment}
                  onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                />
              </div>
              <div className="row mr-0 ml-0">
                <div className="col-md-6 pl-0">
                  <div className="form-field ">
                    <div className="field-title mb-2">City</div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>
                </div>
                <div className="col-md-6 pr-0">
                  <div className="form-field ">
                    <div className="field-title mb-2">Country</div>
                    <Select
                      options={siteConfig.countryCode}
                      onChange={(value) => setFormData({ ...formData, country: value })}
                      placeholder="Select Country"
                      value={formData.country ? formData.country : null}
                    />
                  </div>
                </div>
              </div>

              {formData && formData.country && formData.country.value === 'China' && (
                <div className="form-field mt-4 mb-3">
                  <div className="field-title mb-2">Province</div>
                  <Select
                    options={siteConfig.chinaProvinces}
                    onChange={(value) => setFormData({ ...formData, province: value })}
                    placeholder="Province"
                    value={formData.province}
                  />
                </div>
              )}
              <div className="form-field mt-4 mb-3">
                <div className="field-title mb-2">Phone</div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Postal Code"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                />
              </div>
              <div className="mt-4">
                <CustomButton
                  title={editItem ? 'Update' : 'Add'}
                  background={siteConfig.colors.buttonOrangeColor}
                  hoverBackground={siteConfig.colors.buttonOrangeColorHover}
                  type="button"
                  borderRadius={50}
                  padding={8}
                  callBack={() => submitHandler()}
                  loader={loader}
                />
                <span className="ml-3">
                  <CustomButton
                    title="Cancel"
                    background={siteConfig.colors.buttonOrangeColor}
                    hoverBackground={siteConfig.colors.buttonOrangeColorHover}
                    type="button"
                    borderRadius={50}
                    padding={8}
                    callBack={() => {
                      setFormData({})
                      setShowForm(false)
                      setEditItem(false)
                      setItemContent('')
                    }}
                    loader={false}
                  />
                </span>
              </div>
            </>
          )
        )}
      </div>
    </div>
  )
}

export default DesktopEditProfile
