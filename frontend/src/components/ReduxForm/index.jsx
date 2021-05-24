/** @format */

import React, { Component, useEffect, useState } from 'react'
import RichTextEditor from 'react-rte'
import _, { debounce } from 'lodash'
import Swal from 'sweetalert2'
import Upload from '../../images/upload.png'

import AttachedModalDetail from '../AttachmentModel'
import './redux-form-style.scss'

export class renderField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
    }
  }

  updateInputValue = (e) => {
    this.setState({
      inputValue: e.target.value,
    })
    e.preventDefault()
  }
  render() {
    const { fieldActive } = this.state
    const {
      type,
      label,
      height,
      input,
      fieldId,
      customValue,
      meta: { touched, error },
    } = this.props

    return (
      <div className="inputform newForm">
        <input
          className={
            height
              ? `form-control input-box focusText fieldHeight`
              : `form-control input-box focusText`
          }
          id={fieldId}
          {...input}
          type={type}
          placeholder={fieldActive && !fieldActive ? '' : label}
          disabled={customValue}
          autoComplete="new-password"
        />

        {touched && error && <p className="price-box">{error}</p>}
      </div>
    )
  }
}

export class AttchmentModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedFiles: [],
      showOverlay: false,
      validFiles: [],
      uploadPercentage: 0,
      progressInfos: [],
      showProgressBar: false,
      disabledButton: false,
    }
  }

  dragOver = (e) => {
    e.preventDefault()
  }

  // addDocuments = (selectedFiles) => {
  //   const leadId = this.props.match.params.leadId
  //   this.setState({
  //     showProgressBar: true,
  //     disabledButton: true,
  //   })

  //   let promises = []
  //   for (let i = 0; i < selectedFiles.length; i++) {
  //     let bodyFormData = new FormData()
  //     bodyFormData.append('file', selectedFiles[i])

  //     const options = {
  //       onUploadProgress: (progressEvent) => {
  //         const { loaded, total } = progressEvent
  //         let percent = Math.floor((loaded * 100) / total)

  //         selectedFiles[i].percentage = percent

  //         this.setState({
  //           progressInfos: selectedFiles,
  //         })
  //       },
  //     }

  //     promises.push(
  //       axios.post(
  //         `${config.apiPath}/api/leads/attachment?cmLeadId=${leadId}`,
  //         bodyFormData,
  //         options
  //       )
  //     )
  //   }

  //   Promise.all(promises).then((res) => {
  //     this.setState({
  //       showProgressBar: false,
  //       disabledButton: false,
  //       selectedFiles: [],
  //     })
  //     const { fetchLeadTimeLine, attachmentToggleFromRes } = this.props
  //     fetchLeadTimeLine(leadId)
  //     attachmentToggleFromRes(false)
  //   })
  // }

  dragEnter = (e) => {
    e.preventDefault()
    this.setState({
      showOverlay: true,
    })
  }

  dragLeave = (e) => {
    e.preventDefault()
  }

  removeSpecificData = (value) => {
    const { selectedFiles } = this.state
    let index = _.findIndex(selectedFiles, { name: value })
    selectedFiles.splice(index, 1)

    this.setState({
      selectedFiles,
    })
  }

  validateFile = (file) => {
    const validTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/x-icon',
      'image/bmp',
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv',
    ]
    if (validTypes.indexOf(file.type) === -1) {
      Swal.fire('Warning !', 'The file format is not supported', 'warning')
      this.setState({
        showOverlay: false,
      })
      return false
    }
    return true
  }

  addManualAttachments = (event) => {
    const files = Array.from(event.target.files)

    if (files.length > 10) {
      Swal.fire('Warning !', 'Maximum files upload limit is 10', 'warning')
      return false
    }

    files.forEach((file) => {
      if (this.validateFile(file)) {
        file.percentage = 0
        this.setState((prevState) => {
          return {
            ...prevState,
            selectedFiles: this.uniqueFiles([...prevState.selectedFiles, file]),
          }
        })
      }
    })
  }

  uniqueFiles = (data) => {
    let unique = _.uniqBy(data, 'name')
    return unique
  }

  handleFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      if (this.validateFile(files[i])) {
        this.setState((prevState) => {
          return {
            ...prevState,
            selectedFiles: this.uniqueFiles([...prevState.selectedFiles, files[i]]),
            showOverlay: false,
          }
        })
      }
    }
  }

  fileDrop = (e) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length > 10) {
      Swal.fire('Warning !', 'Maximum files upload limit is 10', 'warning')
      return false
    }
    if (files.length) {
      this.handleFiles(files)
    }
  }
  render() {
    const {
      showOverlay,
      selectedFiles,
      showProgressBar,
      progressInfos,
      disabledButton,
    } = this.state
    let unique = _.uniqBy(selectedFiles, 'name')

    return (
      <div className="attachment-main-container">
        <div className="attachment-modal-header">
          <div className="attachment-header-title">Media</div>
        </div>
        <div className="main-attachment-body">
          <div
            className={
              showOverlay ? 'attachment-body-edges dropdown-overlay' : 'attachment-body-edges'
            }
            onDragOver={this.dragOver}
            onDragEnter={this.dragEnter}
            onDragLeave={this.dragLeave}
            onDrop={this.fileDrop}
          >
            {showOverlay ? (
              <div className="drag-drop-overlay-text">Drop Here :) </div>
            ) : (
              <div className="attachment-body">
                <img src={Upload} className="upload-icon-size" alt="upload file" />
                <div className="drag-drop-text">Drag and Drop Here</div>
                <div className="drag-drop-text">Or</div>
                <div>
                  <input
                    type="file"
                    name="uploadfile"
                    id="img"
                    style={{ display: 'none' }}
                    multiple="multiple"
                    onChange={this.addManualAttachments}
                  />
                  <label htmlFor="img" className="attached-file-text">
                    Add Files
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {showProgressBar
          ? progressInfos &&
            progressInfos.map((progressInfo, index) => (
              <div className="mb-2 mt-2" key={index}>
                <span>{progressInfo.name}</span>
                <div className="progress">
                  <div
                    className="progress-bar progress-bar-info"
                    role="progressbar"
                    aria-valuenow={progressInfo.percentage}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: progressInfo.percentage + '%' }}
                  >
                    {progressInfo.percentage}%
                  </div>
                </div>
              </div>
            ))
          : unique &&
            unique.length > 0 && (
              <div className="attached-container">
                {unique &&
                  unique.map((item, index) => (
                    <AttachedModalDetail
                      key={index}
                      item={item}
                      removeData={(value) => this.removeSpecificData(value)}
                    />
                  ))}
              </div>
            )}

        {/* <div className="attachment-upload-container">
          <button
            className="attachment-upload-button"
            onClick={() => this.addDocuments(unique)}
            disabled={disabledButton}
          >
            Upload
          </button>
        </div> */}
      </div>
    )
  }
}

export const RichTextComponent = ({ input }) => {
  const [value, setValue] = useState(RichTextEditor.createEmptyValue())

  const onChange = (editorValue) => {
    setValue(editorValue)
    debounceSetText(editorValue)
  }

  const debounceSetText = debounce((value) => {
    input.onChange(value.toString('html'))
  }, 500)

  return (
    <RichTextEditor
      value={value ? value : input.value}
      onChange={onChange}
      className="text-editor-font"
    />
  )
}

export class renderFieldWithIcon extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      fieldActive: false,
      colorChange: false,
    }
  }

  activeField = () => {
    this.setState({
      fieldActive: true,
      colorChange: false,
    })
  }

  disableFocus = (e) => {
    this.setState({
      fieldActive: false,
    })
  }

  updateInputValue = (e) => {
    this.setState({
      inputValue: e.target.value,
    })
    this.activateField(e)
    e.preventDefault()
  }
  render() {
    const { fieldActive } = this.state
    const {
      type,
      icon,
      label,
      input,
      fieldId,
      customValue,
      meta: { touched, error },
    } = this.props

    return (
      <div className="inputform newForm">
        <div className="form-group has-search">
          <span
            className={`${icon} ${fieldActive ? 'icon-focus' : 'icon-color'} form-control-feedback`}
            tabIndex="1"
          ></span>
          <input
            className="form-control fieldWithIcon"
            id={fieldId}
            {...input}
            onFocus={() => this.activeField()}
            onBlur={(e) => this.disableFocus(e)}
            type={type}
            placeholder={fieldActive && !fieldActive ? '' : label}
            disabled={customValue}
            autoComplete="new-password"
          />
        </div>

        {touched && error && <div className="error-message">{error}</div>}
      </div>
    )
  }
}

export const required = (value) => (value ? undefined : 'Field is Required')
